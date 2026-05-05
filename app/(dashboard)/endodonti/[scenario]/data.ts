import { endodontiScenarios } from "./data1";
import { endodontiScenarios2 } from "./data2";
import { ScenarioData } from "./data1";

export const allEndodontiScenarios: Record<string, ScenarioData> = {
  ...endodontiScenarios,
  ...endodontiScenarios2
};

export type { ScenarioData };
