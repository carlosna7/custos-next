import LinkButton from "@/components/layout/LinkButton";
import Section from "@/components/layout/Section";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Section className="flex justify-center items-center flex-col">
        <h1 className="font-bold text-4xl pb-10">Bem-vindo ao <span className='pb-1 border-b-4 border-yellow-400 text-yellow-400'>Custos Next!</span></h1>
        <p className="pb-10">Começe a gerenciar seu projetos agora mesmo</p>
        <LinkButton href="/pages/projects/newProject" text="NOVO PROJETO"/>
        <Image src='/images/main-img.png' alt='main-img' width={450} height={450} />
    </Section> 
    )
}
