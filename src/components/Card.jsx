const Card = ({ pokemon, onClick, jpName, color }) => {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{ cursor: "pointer", backgroundColor: color }}
    >
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
        <img src={pokemon.sprites.back_default} alt="" />
      </div>
      <h3 className="cardName">
        {pokemon.id} {jpName}
      </h3>

      <div className="cardType">
        <div>タイプ</div>
        {pokemon.types.map((type, i) => {
          return (
            <span className="typeName" key={i}>
              {type.type.name}{" "}
            </span>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p>重さ：{pokemon.weight}kg</p>
        </div>
        <div className="cardData">
          <p>高さ：{pokemon.height * 10}cm</p>
        </div>
        <div className="cardData">
          <div>アビリティ</div>
          {pokemon.abilities.map((ability, i) => {
            return <span key={i}>{ability.ability.name} </span>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
