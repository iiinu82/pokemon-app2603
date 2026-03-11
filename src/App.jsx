import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card";

import Modal from "./components/Modal";
import MyNavbar from "./components/MyNavbar";
import Search from "./components/Search";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextData, setNextData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [startId, setStartId] = useState(1);
  const [numberOfViews, setNumberOfViews] = useState(20);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [choicePokemonData, setChoicePokemonData] = useState([]);
  // 戻した値を初期値に
  const [ids, setIds] = useState(
    JSON.parse(localStorage.getItem("pokemonIds")) || [],
  );

  const GENERATION_START_IDS = {
    "赤・緑": 1,
    "金・銀": 152,
    "ルビー・サファイア": 252,
    "ダイヤモンド・パール": 387,
    "ブラック・ホワイト": 494,
    "X・Y": 650,
    "サン・ムーン": 722,
    "ソード・シールド": 810,
    "スカーレット・バイオレット": 906,
  };

  // initialURLを渡して返ってきたres.resultsのそれぞれのpokemonのURLからgetPokemonでそれぞれのデータを取り出す
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon.url);

        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      }),
    );

    setPokemonData(_pokemonData);
  };
  // https://pokeapi.co/api/v2/pokemon/1/

  const handleNext = async () => {
    setLoading(true);
    // console.log(nextData);

    let data = await getAllPokemon(nextData);
    await loadPokemon(data.results);
    setNextData(data.next);
    setPrevData(data.previous);
    setLoading(false);
  };

  const handlePrev = async () => {
    if (!prevData) return;
    setLoading(true);
    let data = await getAllPokemon(prevData);
    await loadPokemon(data.results);
    setNextData(data.next);
    setPrevData(data.previous);
    setLoading(false);
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      // console.log(res);

      loadPokemon(res.results);
      setNextData(res.next);
      setPrevData(res.previous);

      setLoading(false);
    };

    fetchPokemonData();
  }, []);

  useEffect(() => {
    const loadChoicePokemons = async () => {
      const choicePokemons = ids.map((id) => {
        return `https://pokeapi.co/api/v2/pokemon/${id}/`;
      });

      let _choicepokemonData = await Promise.all(
        choicePokemons.map((pokemonUrl) => {
          let choicePokemon = getPokemon(pokemonUrl);
          return choicePokemon;
        }),
      );
      console.log(_choicepokemonData);

      setChoicePokemonData(_choicepokemonData);
    };
    loadChoicePokemons();
  }, [ids]);

  const handleSearch = async (startId, numberOfViews) => {
    setLoading(true);
    const offset = startId - 1;
    const searchURL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${numberOfViews}}`;

    let res = await getAllPokemon(searchURL);
    loadPokemon(res.results);
    setNextData(res.next);
    setPrevData(res.previous);

    setLoading(false);
  };

  // カードクリックでモーダルを開く関数
  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  // モーダルを閉じる
  const closeModal = () => {
    setSelectedPokemon(null);
  };

  // console.log(pokemonData);

  return (
    <>
      {/* ナビゲーションバー */}
      <MyNavbar
        GENERATION_START_IDS={GENERATION_START_IDS}
        setStartId={setStartId}
        handleSearch={handleSearch}
        numberOfViews={numberOfViews}
      />

      <div className="bodyContainer">
        {/* 検索 */}
        <Search
          startId={startId}
          setStartId={setStartId}
          setNumberOfViews={setNumberOfViews}
          numberOfViews={numberOfViews}
          handleSearch={handleSearch}
        />

        {loading ? (
          <div className="loading">ロード中</div>
        ) : (
          <>
            {/* ネクストプレブボタン */}
            <div className="button">
              {prevData && <button onClick={handlePrev}>prev</button>}
              <button onClick={handleNext}>next</button>
            </div>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return (
                  <Card
                    key={i}
                    pokemon={pokemon}
                    onClick={() => openModal(pokemon)}
                  />
                );
              })}
            </div>
            {/* ネクストプレブボタン */}
            <div className="button">
              {prevData && <button onClick={handlePrev}>prev</button>}
              <button onClick={handleNext}>next</button>
            </div>
            {/* モーダル表示 */}
            {selectedPokemon && (
              <Modal
                pokemon={selectedPokemon}
                onClose={closeModal}
                setIds={setIds}
              />
            )}
          </>
        )}
      </div>
      {ids.length > 0 ? (
        <div className="choicePokemon">
          <p className="title">選択したポケモンリスト</p>
          <div className="pokemonCardContainer">
            {choicePokemonData.map((pokemon) => {
              return (
                <Card
                  key={pokemon.id}
                  pokemon={pokemon}
                  onClick={() => openModal(pokemon)}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default App;
