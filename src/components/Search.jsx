import "./Search.css";
/* 検索機能 */

const Search = ({
  startId,
  setStartId,
  setNumberOfViews,
  numberOfViews,
  handleSearch,
}) => {
  return (
    <section className="searchArea">
      <div className="inputArea">
        <div className="startId">
          <label>開始ID</label>
          <input
            type="number"
            min="1"
            max="1025"
            value={startId}
            onChange={(e) => setStartId(e.target.value)}
          />
        </div>
        <div className="views">
          <label>表示数</label>
          <input
            type="number"
            value={numberOfViews}
            onChange={(e) => setNumberOfViews(e.target.value)}
          />
        </div>
      </div>
      <div className="button">
        <button
          onClick={() => handleSearch(startId, numberOfViews)}
          disabled={
            !startId || startId < 1 || !numberOfViews || numberOfViews < 1
          }
        >
          検索設定
        </button>
      </div>
    </section>
  );
};

export default Search;
