import React, { useState } from 'react';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { useQuery } from 'react-query';
import { API } from '../Config/Api';

const AdminTransactions = () => {
  const [dropButton, setDropButton] = useState(false);
  const {
    data: transactions,
    refetch,
    isLoading,
  } = useQuery('transactionCache', async () => {
    const response = await API.get('/transactions');
    return response.data.data;
  });
  return (
    <React.Fragment>
      <div className="px-20 bg-black py-10">
        <div className="container mx-auto py-20 h-[100vh] w-4/5">
          <h2 className="font-bold text-white text-lg mb-5">Incoming Transaction</h2>
          <table className="table w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Users</th>
                <th>Remaining Active</th>
                <th>Status User</th>
                <th>Status Payment</th>
              </tr>
            </thead>
            <tbody>
              {transactions &&
                transactions.map((trans, idx) => (
                  <tr>
                    {console.log(trans)}
                    <td>{idx + 1}</td>
                    <td>{trans.user.fullname}</td>
                    <td>26 /hari</td>
                    <td>{trans.user.subscribe ? <span className="text-green-500">Active</span> : <span className="text-red-500">Not Active</span>}</td>
                    <td>{trans.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminTransactions;
