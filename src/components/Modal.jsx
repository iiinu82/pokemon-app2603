import React from "react";
import "./Modal.css";

const Modal = ({ pokemon, onClose, setIds }) => {
  if (!pokemon) return null;
  const saveIds = JSON.parse(localStorage.getItem("pokemonIds")) || [];
  // localStorageに保存したいポケモンのIDを保存する
  const handleSaveIds = () => {
    // const saveIds = JSON.parse(localStorage.getItem("pokemonIds")) || [];

    if (!saveIds.includes(pokemon.id)) {
      saveIds.push(pokemon.id);
      setIds(saveIds);
      localStorage.setItem("pokemonIds", JSON.stringify(saveIds));
    }
  };

  const handleDeleteIds = (id) => {
    // const saveIds = JSON.parse(localStorage.getItem("pokemonIds")) || [];
    const newIds = saveIds.filter((pokemonId) => pokemonId !== id);
    localStorage.setItem("pokemonIds", JSON.stringify(newIds));
    setIds(newIds);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* modalの中身をクリックしてもcloseしないようにするstopPropagation */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="IdNameArea">
          <p className="Id">{pokemon.id}</p>
          <h2>{pokemon.name}</h2>
        </div>

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
          />{" "}
        </div>
        {!saveIds.includes(pokemon.id) ? (
          <button
            className="listButton"
            onClick={() => handleSaveIds(pokemon.id)}
          >
            リストに保存
          </button>
        ) : (
          <button
            className="listButton"
            onClick={() => handleDeleteIds(pokemon.id)}
          >
            リストから削除
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
