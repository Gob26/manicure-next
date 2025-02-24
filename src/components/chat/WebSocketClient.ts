import { webSocketAtom, activeUsersAtom, chatMessagesAtom } from "@/store/chatAtoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

// Адрес сервера WebSocket (сигнальный сервер)
export const SERVER_URL = "ws://localhost:8000/api/v1/ws/signaling"

/**
 * Хук useWebSocketClient устанавливает и управляет WebSocket-соединением.
 *
 * Основные задачи:
 * - Устанавливает соединение с сервером по указанному URL, включающему идентификатор пользователя.
 * - Обрабатывает входящие сообщения: обновляет список активных пользователей и добавляет новые сообщения в историю чата.
 * - Предоставляет функцию для отправки сообщений через WebSocket.
 *
 * @param userId - Идентификатор текущего пользователя, необходимый для установления соединения.
 * @returns Объект с функцией отправки сообщений (sendMessage), списком активных пользователей и историей сообщений.
 */
export const useWebSocketClient = (userId: string | null) => {
    // Получаем атомы состояния из Jotai:
    // webSocketAtom - для хранения объекта WebSocket,
    // activeUsersAtom - для списка активных пользователей,
    // chatMessagesAtom - для хранения истории чата (сообщений).
    const [webSocket, setWebSocket] = useAtom(webSocketAtom);
    const [activeUsers, setActiveUsers] = useAtom(activeUsersAtom);
    const [messages, setMessages] = useAtom(chatMessagesAtom);

    useEffect(() => {
        // Если идентификатор пользователя не передан, прекращаем выполнение эффекта
        if (!userId) return;

        // Создаем новое WebSocket-соединение с сервером, добавляя userId в URL
        const ws = new WebSocket(`${SERVER_URL}/${userId}`);

        // Обработчик события открытия соединения
        ws.onopen = () => {
            console.log("WebSocket соединение установлено");
            // Сохраняем объект WebSocket в глобальное состояние (атом)
            setWebSocket(ws);
        };

        // Обработчик входящих сообщений
        ws.onmessage = (event) => {
            // Парсим данные, полученные от сервера (формат JSON)
            const data = JSON.parse(event.data);

            // Если тип сообщения "user_list" — обновляем список активных пользователей
            if (data.type === "user_list") {
                setActiveUsers(data.users);
            }
            // Если тип сообщения "message" — добавляем новое сообщение в историю чата
            else if (data.type === "message") {
                setMessages((prev) => [...prev, { sender: data.from, message: data.text }]);
            }
            // Можно добавить обработку других типов сообщений (например, для сигналинга WebRTC)
        };

        // Обработчик события закрытия соединения
        ws.onclose = () => {
            console.log("WebSocket соединение закрыто");
            // Сбрасываем состояние, чтобы указать, что соединение разорвано
            setWebSocket(null);
        };

        // Очистка эффекта: закрываем WebSocket-соединение при размонтировании компонента
        return () => {
            ws.close();
        };
    }, [userId, setWebSocket, setActiveUsers, setMessages]);

    /**
     * Функция sendMessage отправляет сообщение через установленное WebSocket-соединение.
     *
     * @param to - Идентификатор получателя сообщения.
     * @param text - Текст отправляемого сообщения.
     */
    const sendMessage = (to: string, text: string) => {
        if (webSocket) {
            // Собираем объект сообщения, сериализуем его в JSON и отправляем через WebSocket
            webSocket.send(JSON.stringify({ type: "message", to, text }));
        }
    };

    // Возвращаем объект с функцией отправки сообщений, списком активных пользователей и историей чата
    return { sendMessage, activeUsers, messages };
};
