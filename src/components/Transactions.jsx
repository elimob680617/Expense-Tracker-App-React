import { useEffect, useState } from "react";

const Transactions = ({ transActions, onDelete }) => {
  const tnx = transActions;
  const [searchItem, setSearchItem] = useState("");
  const [filteredTnx, setFilteredTnx] = useState(tnx);

  const filteredTransaction = (search) => {
    if (!search || search === "") {
      setFilteredTnx(tnx);
      return;
    }
    const filtered = tnx.filter((t) =>
      t.desc.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTnx(filtered);
  };

  const changeHandler = (e) => {
    setSearchItem(e.target.searchValue);
    filteredTransaction(e.target.value);
  };

  useEffect(() => {
    filteredTransaction(searchItem);
  }, [tnx]);

  if (!tnx.length)
    return (
      <h6 style={{ marginTop: "10px", color: "#60a5fa" }}>
        Add Some TransAction!
      </h6>
    );

  return (
    <section>
      <input
        placeholder="search transaction..."
        type="text"
        value={searchItem}
        onChange={changeHandler}
        className="search"
      />
      {filteredTnx.length ? (
        filteredTnx.map((t) => (
          <div
            key={t.id}
            className="transaction"
            style={{ borderColor: t.type === "expense" && "red" }}
            onClick={() => {
              onDelete(t.id);
            }}
          >
            <span>{t.desc}</span>
            <span> $ {t.amount}</span>
          </div>
        ))
      ) : (
        <h6 style={{ marginTop: "10px", color: "red" }}>No Items Match!</h6>
      )}
    </section>
  );
};

export default Transactions;
