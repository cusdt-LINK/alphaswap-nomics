import { Handler } from "@netlify/functions"
import { createSuccessResponse, createServerErrorResponse } from './utils/response'

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
    description: 'AlphaSwap is a KCC-based decentralized exchange allowing users to swap KRC20 tokens. The platform is based on an open protocol fueled by smart contracts. The DEX was launched in January 2022, by the Alpha DAO team. The protocol has been created to add value to the KCC Network and it has coped with this task brilliantly. AlphaSwap delivers a much-needed DEX experience that caters to the needs of different categories of users such as hardcore traders and those who just enter the market. At the time of writing, AlphaSwap supports only KCC-based assets. The AlphaSwap DEX gives the opportunity of trading KCC-based tokens right from a web wallet without deposits and withdrawals to a centralized order book. The platform functions as a one-stop-shop enabling easy exchange of any ERC token without tiring KYC procedures. The process takes just several clicks. The leverage of smart contracts enables autonomous on-chain transactions at marginal costs.The protocol presents a tool developed for the members of the ecosystem that doesn’t charge high fees usually paid to middlemen. The platform uses a math equation and pools of tokens supporting the system. As the exchange uses a permissionless protocol, any ERC20 token can be listed on the platform. There is a liquidity pool for each token on AlphaSwap. In case the platform doesn’t have a pool for a specific token yet, one can create it without any efforts.',
    name: 'AlphaSwap',
    location: '.',
    logo: 'https://gateway.pinata.cloud/ipfs/QmQ12BSKcM9St8FPRTgfKQnUjXAsGXxF7PQBbAEmn765qY',
    twitter: 'alpha_kcc',
    website: 'https://swap.alphadao.money',
    version: "1.0",
    capability: {
      markets: true,
      trades: true,
      tradesByTimestamp: false,
      tradesSnapshot: false,
      tradesSocket: false,
      orders: false,
      ordersSocket: false,
      ordersSnapshot: true,
      candles: false,
      ticker: false
    }










     }),
  };
}