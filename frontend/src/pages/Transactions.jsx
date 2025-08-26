import DashboardLayout from "../layout/DashboardLayout.jsx";
import {useEffect, useState} from "react";
import {useAuth} from "@clerk/clerk-react";
import axios from "axios";
import {apiEndPoints} from "../util/apiEndpoints.js";
import {AlertCircle, Loader, Receipt} from "lucide-react";


export default function Transactions() {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const {getToken} = useAuth();

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                setLoading(true);
                const token = getToken()
                const respnse = await axios.get(apiEndPoints.GET_TRANSACTIONS, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTransactions(respnse.data);
                setError(null);
            } catch (e) {
                console.error("Error fetching transactions", e)
                setError("Failed to load your transactions history. Try again later")
            } finally {
                setLoading(false)
            }
        }
        fetchTransaction()
    }, [getToken])

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }
        return new Date(dateString).toLocaleDateString(undefined, options);
    }


    return (
        <DashboardLayout activeMenu="Transactions">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <Receipt className='text-blue-600'/>
                    <h1 className="text-2xl font-bold">Transaction History</h1>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
                        <AlertCircle size={20}/>
                        <span>{error}</span>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader className='animate-spin mr-2' size={24}/>
                        <span>Loading transactions</span>
                    </div>
                ) : transactions.length === 0 ? (
                    <div className="bg-gray-50 p-8 rounded-lg text-center">
                        <Receipt size={48} className='mx-auto mb-4 text-gray-400'/>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                            No transactions Yet
                        </h3>
                        <p className='text-gray-500'>
                            You haven't made any credits purchase yet.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
                            <thead className='bg-gray-50'>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                    Plan
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                    Credits Added
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                    Payment id
                                </th>
                            </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id} className='hover:bg-gray-50'>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                        {formatDate(transaction.transactionDate)}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                        {transaction.planId === 'premium'
                                            ? 'Premium Plan' : transaction.planId === 'ultimate' ?
                                                "Ultimate Plan" : "Basic Plan"}

                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                        {transaction.amount}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                        {transaction.creditsAdded}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                                        {transaction.paymentId
                                            ? transaction.paymentId.substring(0, 12) + "..." : "N/A"
                                        }

                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </DashboardLayout>
    )
}