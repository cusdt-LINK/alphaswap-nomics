import { getAddress } from '@ethersproject/address'
import { Handler } from "@netlify/functions"
import BigNumber from 'bignumber.js'
import { getSwaps } from './_shared'
import { createSuccessResponse, createBadRequestResponse, createServerErrorResponse } from './utils/response'

export const handler: Handler = async event => {
  if (!event.queryStringParameters?.market || !/^0x[0-9a-fA-F]{40}_0x[0-9a-fA-F]{40}$/.test(event.queryStringParameters.market)) {
    return createBadRequestResponse('Invalid market identifier: must be of format tokenAddress_tokenAddress')
  }

  const [tokenA, tokenB] = event.queryStringParameters.market.split('_')
  let idA: string, idB: string
  try {
    ;[idA, idB] = [getAddress(tokenA), getAddress(tokenB)]
  } catch (error) {
    return createBadRequestResponse('Invalid market identifier: both asset identifiers must be *checksummed* addresses')
  }

  try {
    const swaps = await getSwaps(idA, idB)

    return createSuccessResponse(
      swaps.map(swap => {
        const aIn = swap.amountAIn !== '0'
        const aOut = swap.amountAOut !== '0'
        const bIn = swap.amountBIn !== '0'
        const bOut = swap.amountBOut !== '0'

        // a is the base so if the pair sends a and not b then it's a 'buy'
        const isBuy = aOut && bIn && !aIn && !bOut
        const isSell = !aOut && !bIn && aIn && bOut
        const isBorrowBoth = aOut && bOut && aIn && bIn

        const type = isBuy ? 'buy' : isSell ? 'sell' : isBorrowBoth ? 'borrow-both' : '???'
        const baseAmount = aOut ? swap.amountAOut : swap.amountAIn
        const quoteAmount = bOut ? swap.amountBOut : swap.amountBIn
        return {
          id: swap.id,
          amount: baseAmount,
          amount_quote: quoteAmount,
          type,
          timestamp: swap.timestamp,
          price:
            baseAmount !== '0' ? new BigNumber(quoteAmount).dividedBy(new BigNumber(baseAmount)).toString() : undefined
        }
      })
    )
  } catch (error) {
    return createServerErrorResponse(error)
  }
}
