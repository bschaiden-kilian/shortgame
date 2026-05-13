import React from 'react'

interface ITextProps {
  children: React.ReactNode
}

export const Heading1 = (props: ITextProps) => {
  return (
    <h1 className="text-4xl w-3/4 font-semibold tracking-tight">{props.children}</h1>
  )
}

export const Heading2 = (props: ITextProps) => {
  return (
    <h2 className="text-2xl w-3/4 font-semibold tracking-tight">{props.children}</h2>
  )
}

export const Heading3 = (props: ITextProps) => {
  return (
    <h3 className="text-lg w-3/4 font-semibold tracking-tight">{props.children}</h3>
  )
}

export const Subheading1 = (props: ITextProps) => {
  return (
    <p className=" text-gray-400 font-mono text-xs font-light tracking-wider uppercase">{props.children}</p>
  )
}

export const Subheading2 = (props: ITextProps) => {
  return (
    <p className=" text-gray-400 font-mono text-[10px] font-light tracking-wider uppercase">{props.children}</p>
  )
}


export const Body1 = (props: ITextProps) => {
  return (
    <p className="w-2/3 text-gray-400 space-y-2 text-pretty text-sm font-light">{props.children}</p>
  )
}

export const Body2 = (props: ITextProps) => {
  return (
    <p className="w-2/3 text-gray-400 space-y-2 text-pretty text-xs font-light">{props.children}</p>
  )
}