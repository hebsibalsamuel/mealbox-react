import React from 'react';
import Box from '../../components/Box';
import List, { ListItem } from '../../components/List';
import { parseRawPrice } from './price';
import SummaryText,{TotalText,EmptyText} from '../../components/Summary';

// Create PriceSummary user interface
const PriceSummary = ({ summary, totalPrice }) => (
  <Box width={['290px', '450px']}>
    {summary.length > 0 ?
      <List>
        {summary.map(s =>
          <ListItem key={s.id} paddingBottom='8px' >
            <SummaryText>
              {s.recipeName}{s.selections > 1 && <span> x {s.selections}</span>}
            </SummaryText>
            <SummaryText>
              <span>{parseRawPrice(s.totalRecipePrice)}</span>
            </SummaryText>
          </ListItem>)
        }
        <ListItem key="shippingId" paddingBottom='8px'>
          <SummaryText>
            Shipping
          </SummaryText>
          <SummaryText>
            <span>{parseRawPrice(summary[0].shippingPrice)}</span>
          </SummaryText>
        </ListItem>
        <ListItem key="totalId" paddingTop='8px' borderTopColor='#E4E4E4' borderTopWidth='1px' borderTopStyle='solid' >
          <TotalText>
            Total
          </TotalText>
          <TotalText>
            <span>{totalPrice}</span>
          </TotalText>
        </ListItem>
      </List>
      :
      <EmptyText>
        Cart is empty!
      </EmptyText>
    }
  </Box>
);

export default PriceSummary;

