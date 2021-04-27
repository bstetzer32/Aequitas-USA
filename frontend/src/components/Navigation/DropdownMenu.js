import React, { useState, useRef, useEffect } from 'react'


export default function DropdownMenu(props) {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);

    useEffect(() => {
        const pageClickEvent = (e) => {
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                setIsActive(!isActive);
            }

        };
        
        if (isActive) {
            window.addEventListener('click', pageClickEvent);
        }

        return () => {
            window.removeEventListener('click', pageClickEvent);
        }

    }, [isActive]);

  return (
      <div className="menu-container">
      <button onClick={onClick} className="menu-trigger">
          <i class={`${props.buttonClass}`}></i>
      </button>
      <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
        <ul>
          {props.children}
        </ul>
      </nav>
    </div>
  );
};