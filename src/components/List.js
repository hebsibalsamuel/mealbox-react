import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, layout, typography,color, border} from 'styled-system';
import propTypes from '@styled-system/prop-types';

export const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;   
    ${typography}
    ${space}  
    ${color}  
    ${layout}  
    ${border}   
`;

ListItem.propTypes = {
  ...propTypes.typography,
  ...propTypes.space,
  ...propTypes.color,
  ...propTypes.layout,
  ...propTypes.border
};

ListItem.displayName = 'ListItem';

const List = styled.ul`
  list-style-type: ${(props) => props.listStyleType};
  padding: ${(props) => props.padding};
  ${space}
  ${layout}
`;

List.propTypes = {
  ...propTypes.layout,
  ...propTypes.space,
  listStyleType: PropTypes.string,
};

List.defaultProps = {
  listStyleType: 'none',
  margin: 0,
  padding: 16,
  width: '100%',
};

List.displayName = 'List';

export default List;
