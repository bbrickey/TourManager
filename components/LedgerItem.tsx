import React from "react";

//incomplete, not sure if this needs to be its own component?

type LedgerItemProps = {
  key: string;
  account_type: string;
  category: string;
  /*
    subcategory: string,
    value: number,
    date_created: string,
    tour: string,
    event: string
    */
};

const LedgerItem = ({ key, account_type, category }: LedgerItemProps) => {
  return (
    <div className="ledger-item">
      <div>{account_type}</div>
    </div>
  );
};

export default LedgerItem;
