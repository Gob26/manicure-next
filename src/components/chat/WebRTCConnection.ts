//src/components/chat/WebRTCConnection.ts
// Создавать RTCPeerConnection.
//✅ Обрабатывать ICE-кандидатов.
//✅ Отправлять SDP-офер и SDP-ответ.
//✅ Связывать WebRTC с WebSocket.

import { peerConnectionAtom, webSocketAtom } from "@/store/chatAtoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const ICE_SERVERS = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // STUN-сервер Google (есть TUN и STUN)
};

export const useWebRTCConnection = (userId: string | null, targetUserId: string | null) => {
  const [peerConnection, setPeerConnection] = useAtom(peerConnectionAtom);
  const [webSocket] = useAtom(webSocketAtom);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId || !targetUserId || !webSocket) return;

    const pc = new RTCPeerConnection(ICE_SERVERS);
    setPeerConnection(pc);

    pc.onicecandidate = (event) => {
      if (event.candidate && targetUserId) {
        webSocket.send(
          JSON.stringify({
            type: "candidate",
            to: targetUserId, // Исправлено! Теперь кандидат отправляется собеседнику.
            candidate: event.candidate,
          })
        );
      }
    };

    pc.ontrack = (event) => {
      console.log("Получен медиапоток", event.streams);
    };

    return () => {
      pc.close();
      setPeerConnection(null);
    };
  }, [userId, targetUserId, webSocket, setPeerConnection]);

  const startCall = async () => {
    if (!peerConnection || !webSocket || !targetUserId) return;

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    webSocket.send(
      JSON.stringify({
        type: "offer",
        to: targetUserId,
        offer,
      })
    );
  };

  const handleWebRTCMessage = async (data: any) => {
    if (!peerConnection) return;

    if (data.type === "offer") {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      webSocket?.send(
        JSON.stringify({
          type: "answer",
          to: data.from,
          answer,
        })
      );
    } else if (data.type === "answer") {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
    } else if (data.type === "candidate") {
      await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  };

  return { startCall, isConnected, handleWebRTCMessage };
};
