import { peerConnectionAtom } from "@/store/chatAtoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useWebSocketClient } from "./WebSocketClient";

const ICE_SERVERS = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export const useWebRTCConnection = (userId: string | null, targetUserId: string | null) => {
  const [peerConnection, setPeerConnection] = useAtom(peerConnectionAtom);
  const [isConnected, setIsConnected] = useState(false);

  // Подключаем WebSocket-клиент и передаем в него обработчик WebRTC сообщений
  const { sendMessage, activeUsers, messages } = useWebSocketClient(userId, handleWebRTCMessage);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const pc = new RTCPeerConnection(ICE_SERVERS);
    setPeerConnection(pc);

    pc.onicecandidate = (event) => {
      if (event.candidate && targetUserId) {
        sendMessage(targetUserId, JSON.stringify({ type: "candidate", candidate: event.candidate }));
      }
    };

    pc.onconnectionstatechange = () => {
      setIsConnected(pc.connectionState === "connected");
    };

    return () => {
      pc.close();
      setPeerConnection(null);
    };
  }, [userId, targetUserId, sendMessage, setPeerConnection]);

  const startCall = async () => {
    if (!peerConnection || !targetUserId) return;

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    sendMessage(targetUserId, JSON.stringify({ type: "offer", offer }));
  };

  async function handleWebRTCMessage(data: any) {
    if (!peerConnection) return;

    if (data.type === "offer") {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      sendMessage(data.from, JSON.stringify({ type: "answer", answer }));
    } 
    else if (data.type === "answer") {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
    } 
    else if (data.type === "candidate") {
      await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  }

  return { startCall, isConnected, activeUsers, messages };
};
