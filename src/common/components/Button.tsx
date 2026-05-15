import type { ReactNode } from "react"

interface IButtonProps {
    children: ReactNode,
    onClick: () => void,
    disabled?: boolean
}

export const Button = (props: IButtonProps) => {
    return (
        <button
            disabled={props.disabled}
            className="w-full h-full rounded font-bold uppercase border border-emerald-400 bg-emerald-500 text-mist-900 hover:bg-emerald-700 disabled:bg-mist-700 disabled:border-mist-600"
            onClick={() => props.onClick()}>
            {props.children}
        </button>
    )
}

export const ButtonGrey = (props: IButtonProps) => {
    return (
        <button disabled={props.disabled} className="w-full h-full rounded font-bold uppercase border border-mist-800 bg-mist-900 text-white hover:bg-mist-700" onClick={() => props.onClick()}>{props.children}</button>
    )
}

export const ButtonOutline = (props: IButtonProps) => {
    return (
        <button
            className="w-full h-full rounded font-bold uppercase border border-mist-800 bg-mist-950 text-gray-400 hover:bg-mist-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-mist-950"
            onClick={() => props.onClick()}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}


