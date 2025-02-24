// src/store/chatAtoms.ts
import { atom } from "jotai";

// ✅ 1. Атом для хранения WebSocket-соединения
export const webSocketAtom = atom<WebSocket | null>(null);
// Значение по умолчанию — `null`, пока соединение не установлено.

// ✅ 2. Атом для хранения состояния WebRTC PeerConnection
export const peerConnectionAtom = atom<RTCPeerConnection | null>(null);
// Это объект, который управляет WebRTC соединением между пользователями.

// ✅ 3. Атом для хранения текущего пользователя (его ID)
export const currentUserAtom = atom<string | null>(null);
// В этом атоме будет ID текущего пользователя, полученный после аутентификации.

// ✅ 4. Атом для хранения списка активных собеседников
export const activeUsersAtom = atom<string[]>([]);
// Массив ID пользователей, которые сейчас в сети и готовы к общению.

// ✅ 5. Атом для хранения истории сообщений
export const chatMessagesAtom = atom<{ sender: string; message: string }[]>([]);
// История чата хранится в виде массива объектов: { sender: "user1", message: "Привет!" }

