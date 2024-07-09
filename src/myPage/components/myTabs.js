import * as React from 'react';
import { Tabs } from '@mui/base/Tabs';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { styled } from '@mui/system';

function MyTabs() {
  return (
    <Tabs defaultValue="/my-records">
      <TabsContainer>
        <TabsList>
          <Tab value="/bests/:id">
            BEST
          </Tab>
          <Tab value="/community">
            커뮤니티
          </Tab>
          <Tab value="/challenge">
            챌린지
          </Tab>
        </TabsList>
        <MyInfoTabsList>
          <Tab value="/my-records">
            나의 운동 기록
          </Tab>
          <Tab value="/profile">
            닉네임 님
          </Tab>
        </MyInfoTabsList>
      </TabsContainer>
    </Tabs>
  );
}

export default function UnstyledTabsRouting() {
  return (
    <TabsWrapper>
      <MyTabs />
    </TabsWrapper>
  );
}

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const Tab = styled(BaseTab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: inline-flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }
`;

const TabsWrapper = styled('div')`
  background-color: ${blue[500]};
  border-radius: 12px;
`;

const TabsContainer = styled('div')`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TabsList = styled(BaseTabsList)`
  min-width: 600px;
  background-color: ${blue[500]};
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  margin-right: 10%;
  padding-right: 20%;
`;

const MyInfoTabsList = styled(BaseTabsList)`
  min-width: 300px;
  background-color: ${blue[500]};
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  margin-left: 20%;
`;
