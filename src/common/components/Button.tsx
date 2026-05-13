import type { ReactNode } from "react"

interface IButtonProps {
    children: ReactNode,
    onClick: () => void
}

export const Button = (props: IButtonProps) => {
    return (
        <button className="w-full h-full rounded font-bold uppercase border border-emerald-400 bg-emerald-500 text-mist-900 hover:bg-emerald-700" onClick={() => props.onClick()}>{props.children}</button>
    )
}

export const ButtonGrey = (props: IButtonProps) => {
    return (
        <button className="w-full h-full rounded font-bold uppercase border border-mist-800 bg-mist-900 text-white hover:bg-mist-700" onClick={() => props.onClick()}>{props.children}</button>
    )
}

export const ButtonOutline = (props: IButtonProps) => {
    return (
        <button className="w-full h-full rounded font-bold uppercase border border-mist-800 bg-mist-950 text-gray-400 hover:bg-mist-700" onClick={() => props.onClick()}>{props.children}</button>
    )
}


