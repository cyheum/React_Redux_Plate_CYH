import React, { useEffect, useState } from 'react';

import * as S from './index.style';

interface IProps {
  itemList: { id?: string | number; name?: string }[];
  value?: string;
  defaultValue: string | number;
  containerStyle?: string;
  buttonStyle?: string;
  itemListStyle?: string;
  listItemStyle?: string;
  noAllButton?: boolean;
  downArrowIcon?: boolean;
  fontSize?: number;
  onClickSelectBox?(): void;
  onClickSelectItem(value: string | number, id?: string | number): void;
  onClickSelectItemInfo?(info: any, index?: number): void;
}

export const SelectBox: React.FC<IProps> = ({
  itemList,
  value,
  defaultValue,
  containerStyle,
  buttonStyle,
  itemListStyle,
  listItemStyle,
  noAllButton,
  downArrowIcon,
  fontSize,
  onClickSelectBox,
  onClickSelectItem,
  onClickSelectItemInfo,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeList = () => {
      setIsOpen(false);
    };
    window.addEventListener('click', closeList);

    return () => {
      window.removeEventListener('click', closeList);
    };
  }, []);

  return (
    <S.Container $containerStyle={containerStyle}>
      <S.OrderButton
        $buttonStyle={buttonStyle}
        $fontSize={fontSize}
        onClick={(e) => {
          e.stopPropagation();
          onClickSelectBox ? onClickSelectBox() : setIsOpen(!isOpen);
        }}
      >
        <p className={!value ? 'gray name ' : 'name'}>
          {!value || value === 'all' ? defaultValue : value}
        </p>
        {downArrowIcon ? (
          <S.DownArrowIcon reversed={isOpen} />
        ) : (
          <S.TriangleDownIcon reversed={isOpen} />
        )}
      </S.OrderButton>
      <S.SelectItemList $itemListStyle={itemListStyle} $isOpen={isOpen}>
        <div>
          {!noAllButton && (
            <S.SelectItem
              $isSelected={!value || value === 'all'}
              $listItemStyle={listItemStyle}
              $fontSize={fontSize}
              onClick={(e) => {
                e.stopPropagation();
                onClickSelectItem('all');
                setIsOpen(!isOpen);
              }}
            >
              {defaultValue}
            </S.SelectItem>
          )}
          {itemList.map((itemInfo, index) => {
            const { id, name } = itemInfo;
            return (
              <S.SelectItem
                key={`${id ?? name ?? 'name'} ${index}`}
                $listItemStyle={listItemStyle}
                $fontSize={fontSize}
                $isSelected={
                  id ? value === id || value === name : value === name
                }
                onClick={() => {
                  onClickSelectItem(id ?? name ?? 'name', name ?? undefined);
                  onClickSelectItemInfo &&
                    onClickSelectItemInfo(itemInfo, index);
                  setIsOpen(!isOpen);
                }}
              >
                <p className="option">{name ?? id ?? 'name'} </p>
              </S.SelectItem>
            );
          })}
        </div>
      </S.SelectItemList>
    </S.Container>
  );
};
