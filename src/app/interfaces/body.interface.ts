import { IItem } from './inventory.interface';
import { IPlace } from './places.interface';
export interface IHumanoidBodyOld {
  head: {
    brain?: {
      status: string[];
      hp: number;
    };
    eyes?: {
      status: string[];
      hp: number;
    };
    tongue?: {
      status: string[];
      hp: number;
    };
    teeth?: {
      status: string[];
      hp: number;
    };
    nose?: {
      status: string[];
      hp: number;
    };
    ears?: {
      status: string[];
      hp: number;
    };
    neck?: {
      status: string[];
      hp: number;
    };
  };
  upperBody: {
    heart?: {
      status: string[];
      hp: number;
    };
    liver?: {
      status: string[];
      hp: number;
    };
    lungs?: {
      status: string[];
      hp: number;
    };
    pancreas?: {
      status: string[];
      hp: number;
    };
    skin?: {
      status: string[];
      hp: number;
    };
    leftArm?: {
      status: string[];
      hp: number;
    };
    rightArm?: {
      status: string[];
      hp: number;
    };
    leftHand?: {
      status: string[];
      hp: number;
    };
    rightHand?: {
      status: string[];
      hp: number;
    };
  };
  lowerBody: {
    genitals?: {
      status: string[];
      hp: number;
    };
    knees?: {
      status: string[];
      hp: number;
    };
    leftLeg?: {
      status: string[];
      hp: number;
    };
    rightLeg?: {
      status: string[];
      hp: number;
    };
    leftFoot?: {
      status: string[];
      hp: number;
    };
    rightFoot?: {
      status: string[];
      hp: number;
    };
    intestine?: {
      status: string[];
      hp: number;
    };
  };
}
