import { Box, Tabs, Tab } from "@mui/material";


interface TabOption {
  label: string;
  value: number;
}

interface TapsProps {
  selectedTab: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  tabs: TabOption[];
  className?: string;
}

export function Taps({ selectedTab, onTabChange, tabs, className }: TapsProps) {
  return (
    <Box className={className}>
      <Tabs
        value={selectedTab}
        onChange={onTabChange}
        TabIndicatorProps={{
          style: { backgroundColor: "#E31E24", height: "2px" },
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            sx={{
              color: selectedTab === tab.value ? "#E31E24" : "#000",
              textTransform: "none",
              fontWeight: selectedTab === tab.value ? 600 : 400,
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
