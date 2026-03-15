"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {

const [open, setOpen] = useState(false)

return (

<nav className="bg-slate-900 text-white border-b border-slate-800">

<div className="max-w-7xl mx-auto px-4">

<div className="flex items-center justify-between h-16">

{/* Logo */}
<Link href="/" className="flex items-center gap-2 font-bold text-lg">
CreatorTools
</Link>

{/* Desktop Menu */}
<div className="hidden md:flex gap-6">

<Link href="/">Home</Link>

<Link href="/tools">Tools</Link>

<Link href="/privacy">Privacy</Link>

<Link href="/contact">Contact</Link>

</div>

{/* Mobile Menu Button */}
<button
onClick={() => setOpen(!open)}
className="md:hidden"
>

{open ? <X size={26} /> : <Menu size={26} />}

</button>

</div>

</div>

{/* Mobile Menu */}

{open && (

<div className="md:hidden bg-slate-900 border-t border-slate-800">

<div className="flex flex-col p-4 gap-4">

<Link href="/" onClick={()=>setOpen(false)}>Home</Link>

<Link href="/tools" onClick={()=>setOpen(false)}>Tools</Link>

<Link href="/privacy" onClick={()=>setOpen(false)}>Privacy</Link>

<Link href="/contact" onClick={()=>setOpen(false)}>Contact</Link>

</div>

</div>

)}

</nav>

)

}
