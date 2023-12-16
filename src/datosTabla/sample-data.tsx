/** @jsx jsx */
import { FC, ReactNode } from 'react';
import { css, jsx } from '@emotion/react';
import Avatar from '@atlaskit/avatar';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import { token } from '@atlaskit/tokens';

import { lorem } from './lorem';
import { presidents } from './presidents';

interface President {
  id: number;
  name: string;
  party: string;
}

function createKey(input: string) {
  return input ? input.replace(/^(the|a|an)/, '').replace(/\s/g, '') : input;
}

function iterateThroughLorem(index: number) {
  return index > lorem.length ? index - lorem.length : index;
}

const nameWrapperStyles = css({
  display: 'flex',
  alignItems: 'center',
});

const NameWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <span css={nameWrapperStyles}>{children}</span>
);

const avatarWrapperStyles = css({
  marginRight: token('space.100', '8px'),
});

const AvatarWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <div css={avatarWrapperStyles}>{children}</div>
);

export const caption = 'List of US Presidents';

export const createHead = (withWidth: boolean) => {
  return {
    cells: [
      {
        key: 'name',
        content: 'Encargado',
        isSortable: true,
        width: withWidth ? 25 : undefined,
      },
      {
        key: 'party',
        content: 'Proyecto',
        shouldTruncate: true,
        isSortable: true,
        width: withWidth ? 15 : undefined,
      },
      {
        key: 'more',
        content: 'Estado',
        shouldTruncate: true,
        width: withWidth ? 15 : undefined,
      },
    ],
  };
};

export const head = createHead(true);

export const rows = presidents.map((president: President, index: number) => ({
  key: `row-${index}-${president.name}`,
  isHighlighted: false,
  cells: [
    {
      key: createKey(president.name),
      content: (
        <NameWrapper>
          <AvatarWrapper>
            <Avatar name={president.name} size="medium" />
          </AvatarWrapper>
          <a href="">{president.name}</a>
        </NameWrapper>
      ),
    },
    {
      key: createKey(president.party),
      content: president.party,
    },
    /*{
      key: president.id,
    },*/
    /*{
      key: 'Lorem',
      content: iterateThroughLorem(index),
    },*/

    {
      key: 'MoreDropdown',
      content: (
        <DropdownMenu trigger="No atendida">
          <DropdownItemGroup>
            <DropdownItem>Atendida</DropdownItem>
            <DropdownItem>No atendida</DropdownItem>
          </DropdownItemGroup>
        </DropdownMenu>
      ),
    },
  ],
}));
