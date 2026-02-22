"use client"

import Link from "next/link"

interface SmoothLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function SmoothLink({
  href,
  children,
  className,
  onClick,
}: SmoothLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e)

    if (!href.startsWith("#")) return

    e.preventDefault()

    const target = document.getElementById(href.slice(1))
    if (!target) return

    const lenis = (window as any).lenis

    if (lenis?.scrollTo) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.1,
      })
    } else {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}