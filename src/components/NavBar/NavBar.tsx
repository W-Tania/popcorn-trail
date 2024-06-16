import React from "react";
import "./Navbar.css";

interface NavBarProps {
  children: any;
}

export default function NavBar(props: NavBarProps) {
  return <nav className="Navbar">{props.children}</nav>;
}
