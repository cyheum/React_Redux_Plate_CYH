import React from 'react';

import { BasicModal } from '../BasicModal';

interface IProps {
  title: string;
  description?: string;
  closeButtonText?: string;
  containerStyle?: string;
  modalWrapperStyle?: string;
  onClickClose(): void;
}

export const SimpleAlert: React.FC<IProps> = ({
  title,
  description,
  closeButtonText,
  containerStyle,
  modalWrapperStyle,
  onClickClose,
}) => {
  return (
    <BasicModal
      noCloseButton
      title={title ?? '제목'}
      containerStyle={containerStyle}
      descriptionStyle={'margin-bottom: 1rem;'}
      modalWrapperStyle={`padding: 1.875rem; text-align:center; ${modalWrapperStyle}`}
      titleStyle={
        'font-size: 1.5rem; margin-bottom: 1.875rem; text-align:center;'
      }
      description={description}
      onClickClose={onClickClose}
      closeButtonText={closeButtonText ?? '확인'}
      closeButtonType={'black'}
      buttonStyle={'width: 15rem; border-radius: 1.5rem;'}
    />
  );
};
