import React from "react";
import "./Modal.css";

const Modal = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* modalの中身をクリックしてもcloseしないようにするstopPropagation */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>{pokemon.name}</h2>
        <div>
          <img
            src={pokemon.sprites.front_default}
            alt="{pokemon.name}"
            width="150px"
          />
          <img src={pokemon.sprites.back_default} width="150px" />
        </div>
        <div>
          <img src={pokemon.sprites.front_shiny} width="150px" />
          <img src={pokemon.sprites.back_shiny} width="150px" />
        </div>
        <div>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            width="150px"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
