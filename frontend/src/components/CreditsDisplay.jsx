import {CreditCard} from "lucide-react";


export default function CreditsDisplay({credits}){

    return(
        <div className="flex items-center gap-1 bg-blue-50 py-1 5 rounded-full text-blue-700">
            <CreditCard  size={16}/>
            <span className="font-medium">{credits}</span>
            <span className="text-xs">Credits</span>
        </div>
    )
}