// TransactionList.tsx
import React from 'react';
import { ArrowUpLeft } from 'lucide-react';
import { Transaction } from '@/library/types/type';

interface TransactionListProps {
  transactions: Transaction[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, isLoading, isError }) => {
  if (isLoading) return <div>Loading transactions...</div>;
  if (isError) return <div>Error loading transactions</div>;
  if (!transactions || transactions.length === 0) return <div>No transactions available</div>;

  return (
    <div className="bg-lightMode-background-main dark:bg-darkMode-background-main p-4 rounded-t-3xl">
      <h3 className="text-lg font-semibold mb-4">Transactions</h3>
      <div className="grid grid-cols-[1fr,1fr,1fr,1fr,auto] gap-4 text-xs">
        <div className="font-semibold">Status</div>
        <div className="font-semibold">Name</div>
        <div className="font-semibold">Amount</div>
        <div className="font-semibold">Room</div>
        <div className="font-semibold">Date & Time</div>
        {transactions.map((transaction, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center">
              <div
                className={`rounded-full w-5 h-5 flex items-center justify-center mr-2 ${
                  transaction.payment_status === "completed"
                    ? "bg-green-500"
                    : transaction.payment_status === "pending"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                <ArrowUpLeft color="#FFFFFF" size={16} />
              </div>
              <span className="capitalize">{transaction.payment_status}</span>
            </div>
            <div>{transaction.name}</div>
            <div>₦{parseFloat(transaction.amount).toLocaleString()}</div>
            <div>{transaction.sub_asset_number}</div>
            <div>{new Date(transaction.date_time).toLocaleString()}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;