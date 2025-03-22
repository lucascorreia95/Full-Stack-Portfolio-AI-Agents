"use client";
import useChat from "@/hooks/useChat";
import { IconMessages, IconReload, IconSend } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import BalaoMensagem from "./BalaoMensagem";
import Image from "next/image";

export default function JanelaChat() {
	const [texto, setTexto] = useState("");
	const { limparMensagens, mensagens, adicionarMensagem, pensando } = useChat();
	const fimChatRef = useRef<HTMLDivElement>(null);

	function enviarMensagem() {
		adicionarMensagem(texto);
		setTexto("");
	}

	useEffect(() => {
		fimChatRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [mensagens]);

	return (
		<div className="felx flex-col bg-zinc-300 rounded-2xl text-black overflow-hidden">
			<div className="flex justify-between items-center bg-white p-4">
				<h2 className="text-xl font-bold">Ola visitante!</h2>
				<IconReload size={24} className="text-black cursor-pointer" onClick={limparMensagens} />
			</div>
			{mensagens.length === 0 ? (
				<div className="flex flex-col justify-center items-center min-h-[400px] sm:min-h-[500px]">
					<IconMessages size={230} stroke={0.2} className="text-black/30" />
					<span>Vamos Conversar?</span>
				</div>
			) : (
				<div className="flex flex-col p-2 gap-2 min-h-[400px] sm:min-h-[500px] max-h-[400px] sm:max-h-[500px] overflow-y-scroll">
					{mensagens.map((mensagem) => (
						<BalaoMensagem key={mensagem.id} mensagem={mensagem} />
					))}
					{pensando && <Image src="/pensando.gif" alt="pensando" width={50} height={50} />}
					<div ref={fimChatRef}></div>
				</div>
			)}
			<div className="h-px bg-zinc-400 mt-4"></div>
			<div className="flex items-center gap-2 m-4 p-1 rounded-full h-10 bg-white">
				<input
					type="text"
					value={texto}
					className="flex-1 bg-transparent h-8 outline-none pl-3"
					onChange={(e) => {
						setTexto(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							enviarMensagem();
						}
					}}
				/>
				<button
					onClick={enviarMensagem}
					className="flex justify-center items-center min-h-8 min-w-8 rounded-full bg-red-500"
				>
					<IconSend className="text-white" size={18} />
				</button>
			</div>
		</div>
	);
}
