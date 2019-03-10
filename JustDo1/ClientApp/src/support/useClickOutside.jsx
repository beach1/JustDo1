import React,{useRef,useEffect} from 'react';
import ReactDOM from 'react-dom';
export const useClickOutside = (handle) => {
    const ref =useRef();

    const handleClickOutside = (event) => {
        if (ref) {
            const domNode = ReactDOM.findDOMNode(ref.current);

            if (!domNode.contains(event.target) && handle){
                handle();
            }
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown',handleClickOutside);

        return () => {
            document.removeEventListener('mousedown',handleClickOutside);
        }
    }, []);

    return [ref];
}