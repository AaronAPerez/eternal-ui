import { useState } from "react"

const CostCalculator = () => {
  const [monthlyVisitors, setMonthlyVisitors] = useState(10000)
  
  const wordpressCosts = {
    hosting: 25,
    plugins: 50,
    security: 15,
    backup: 10,
    cdn: 20,
    total: 120
  }
  
  const eternalUICost = 39
  const monthlySavings = wordpressCosts.total - eternalUICost
  const yearlySavings = monthlySavings * 12
  
  return (
    <div className="bg-green-50 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">💰 Calculate Your Savings</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-red-600">WordPress Total:</h4>
          <p className="text-2xl font-bold">${wordpressCosts.total}/month</p>
        </div>
        <div>
          <h4 className="font-semibold text-green-600">Eternal UI:</h4>
          <p className="text-2xl font-bold">${eternalUICost}/month</p>
        </div>
      </div>
      <div className="mt-4 p-4 bg-green-100 rounded-lg">
        <p className="text-lg font-bold text-green-700">
          Save ${yearlySavings}/year = ${monthlySavings}/month
        </p>
      </div>
    </div>
  )
}