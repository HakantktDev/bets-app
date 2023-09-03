import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelectedBetsContext } from "./context/SelectedBetsContext";

const Bets = () => {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialBetData, setInitialBetData] = useState({});
  const [selectedElements, setSelectedElements] = useState({});
  const [activeSelections, setActiveSelections] = useState([]);
  const [displayedBets, setDisplayedBets] = useState([]);
  const loadMoreRef = useRef(null);
  const { setSelectedBets } = useSelectedBetsContext();

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const response = await fetch("https://nesine-case-study.onrender.com/bets");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setInitialBetData(data[0]);
        setBets(data);
        setLoading(false);
        setDisplayedBets(data.slice(0, 15));
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchBets();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && displayedBets.length < bets.length) {
          setLoading(true);
          setDisplayedBets((prevBets) => {
            const nextChunk = bets.slice(prevBets.length, prevBets.length + 15);
            return [...prevBets, ...nextChunk];
          });
          setLoading(false);
        }
      },
      {
        threshold: 1,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [bets, loadMoreRef, loading, displayedBets.length]);

  useEffect(() => {
    setSelectedBets(activeSelections);
  }, [activeSelections]);

  const handleSelection = useCallback((rowIndex, itemIndex, data, value) => {
    setSelectedElements((prevSelected) => {
      if (prevSelected[rowIndex] && prevSelected[rowIndex].itemIndex === itemIndex) {
        const newState = { ...prevSelected };
        delete newState[rowIndex];
        setActiveSelections((prev) => prev.filter((selection) => selection.rowIndex !== rowIndex));
        return newState;
      }
      if (prevSelected[rowIndex]) {
        setActiveSelections((prev) => prev.filter((selection) => !(selection.rowIndex === rowIndex)));
      }
      setActiveSelections((prev) => [...prev, { rowIndex, itemIndex, data, value }]);
      return {
        ...prevSelected,
        [rowIndex]: {
          itemIndex: itemIndex,
          data: data,
          value: value,
        },
      };
    });
  }, []);

  if (loading) {
    return (
      <div className="center-content">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!loading && error) {
    return (
      <div className="center-content">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="fixed-header">
        <div className="table-element">Event Count: {bets.length}</div>
        <div className="table-element">Yorumlar</div>
        <div className="table-element"></div>
        <div className="table-element">1</div>
        <div className="table-element">X</div>
        <div className="table-element">2</div>
        <div className="table-element">Alt</div>
        <div className="table-element">Üst</div>
        <div className="table-element">H1</div>
        <div className="table-element">1</div>
        <div className="table-element">x</div>
        <div className="table-element">2</div>
        <div className="table-element">H2</div>
        <div className="table-element">1-X</div>
        <div className="table-element">1-2</div>
        <div className="table-element">X-2</div>
        <div className="table-element">Var</div>
        <div className="table-element">Yok</div>
        <div className="table-element">+99</div>
      </div>
      <div className="mt-2">
        {bets &&
          displayedBets.map((item, index) => (
            <div key={index}>
              <div className="table-row-header">
                <div className="table-element">
                  {initialBetData.D} {initialBetData.DAY} {initialBetData.LN}
                </div>
                <div className="table-element">Yorumlar</div>
                <div className="table-element"></div>
                <div className="table-element">{initialBetData?.OCG?.["1"].OC?.["0"]?.N}</div>
                <div className="table-element">{initialBetData?.OCG?.["1"].OC?.["1"]?.N}</div>
                <div className="table-element">2</div>
                <div className="table-element">{initialBetData?.OCG?.["5"].OC?.["25"]?.N}</div>
                <div className="table-element">{initialBetData?.OCG?.["5"].OC?.["26"]?.N}</div>
                <div className="table-element">H1</div>
                <div className="table-element">1</div>
                <div className="table-element">x</div>
                <div className="table-element">2</div>
                <div className="table-element">H2</div>
                <div className="table-element">{initialBetData?.OCG?.["2"].OC?.["3"]?.N}</div>
                <div className="table-element">{initialBetData?.OCG?.["2"].OC?.["4"]?.N}</div>
                <div className="table-element">{initialBetData?.OCG?.["2"].OC?.["5"]?.N}</div>
                <div className="table-element">Var</div>
                <div className="table-element">Yok</div>
                <div className="table-element border-right-none">+99</div>
              </div>
              <div className="table-row">
                <div className="table-element">
                  <span>{item.C}</span> {item.T} {item.N}
                </div>
                <div className="table-element">Yorumlar</div>
                <div className="table-element">{item?.OCG?.["1"].MBS}</div>
                <div
                  className={`table-element ${selectedElements[index]?.itemIndex === 0 ? "selected" : ""}`}
                  onClick={() => handleSelection(index, 0, item, item?.OCG?.["1"].OC?.["0"]?.O)}
                >
                  {item?.OCG?.["1"].OC?.["0"]?.O}
                </div>
                <div
                  className={`table-element ${selectedElements[index]?.itemIndex === 1 ? "selected" : ""}`}
                  onClick={() => handleSelection(index, 1, item, item?.OCG?.["1"].OC?.["1"]?.O)}
                >
                  {item?.OCG?.["1"].OC?.["1"]?.O}
                </div>
                <div className="table-element"></div>
                <div
                  className={`table-element ${selectedElements[index]?.itemIndex === 25 ? "selected" : ""}`}
                  onClick={() => handleSelection(index, 25, item, item?.OCG?.["5"].OC?.["25"]?.O)}
                >
                  {item?.OCG?.["5"].OC?.["25"]?.O}
                </div>
                <div
                  className={`table-element ${selectedElements[index]?.itemIndex === 26 ? "selected" : ""}`}
                  onClick={() => handleSelection(index, 26, item, item?.OCG?.["5"].OC?.["26"]?.O)}
                >
                  {item?.OCG?.["5"].OC?.["26"]?.O}
                </div>
                <div className="table-element"></div>
                <div className="table-element"></div>
                <div className="table-element"></div>
                <div className="table-element"></div>
                <div className="table-element"></div>
                <div
                  className={`table-element ${selectedElements[index]?.itemIndex === 3 ? "selected" : ""}`}
                  onClick={() => handleSelection(index, 3, item, item?.OCG?.["2"].OC?.["3"]?.O)}
                >
                  {item?.OCG?.["2"].OC?.["3"]?.O}
                </div>
                <div
                  className={`table-element ${selectedElements[index]?.itemIndex === 4 ? "selected" : ""}`}
                  onClick={() => handleSelection(index, 4, item, item?.OCG?.["2"].OC?.["4"]?.O)}
                >
                  {item?.OCG?.["2"].OC?.["4"]?.O}
                </div>
                <div
                  className={`table-element ${selectedElements[index]?.itemIndex === 5 ? "selected" : ""}`}
                  onClick={() => handleSelection(index, 5, item, item?.OCG?.["2"].OC?.["5"]?.O)}
                >
                  {item?.OCG?.["2"].OC?.["5"]?.O}
                </div>
                <div className="table-element"></div>
                <div className="table-element"></div>
                <div className="table-element border-right-none">3</div>
              </div>
            </div>
          ))}
        <div ref={loadMoreRef}>
          {loading && (
            <div className="center-content">
              <div className="spinner"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Bets;
