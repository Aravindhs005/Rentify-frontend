import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import DelhiIcon from './icons/delhi.png';
import BangaloreIcon from './icons/bangalore.png';
import HyderabadIcon from './icons/hyderabad.png';
import ChennaiIcon from './icons/chennai.png';
import CoimbatoreIcon from './icons/cbe.png';
import KochiIcon from './icons/kochi.png';
import EarthIcon from './icons/earth.png';
import aussieIcon from './icons/aussie.png';
import londonIcon from './icons/london.png';
import usaIcon from './icons/usa.png';

import {
  BiSolidWasher,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
} from "react-icons/bi";
import {
  FaUniversity,
  FaHospital,
  FaTrain
} from "react-icons/fa";

import { BsSnow, BsPersonWorkspace } from "react-icons/bs";
import { MdBalcony, MdPets, MdLocalAirport } from "react-icons/md";
import {
  PiTelevisionFill,
} from "react-icons/pi";
import {
  GiCctvCamera,
} from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";

export const categories = [
  {
    label: "All",
    icon: <img src={EarthIcon} alt="Earth Icon" />,
  },
  {
    img: "assets/chennai.jpg",
    label: "Chennai",
    icon: <img src={ChennaiIcon} alt="Chennai Icon" />,
    description: "Namm Chennai!",
  },
  {
    img: "assets/banglore.jpg",
    label: "Bangalore",
    icon: <img src={BangaloreIcon} alt="Bangalore Icon" />,
    description: "Silicon Valley of India!",
  },
  {
    img: "assets/hyderabad.jpg",
    label: "Hyderabad",
    icon: <img src={HyderabadIcon} alt="Hyderabad Icon" />,
    description: "The City of PearlS!",
  },
  {
    img: "assets/delhi.jpg",
    label: "Delhi",
    icon: <img src={DelhiIcon} alt="New Delhi Icon" />,
    description: "National Capital Territory!",
  },
  {
    img: "assets/cbe.jpg",
    label: "Coimbatore",
    icon: <img src={CoimbatoreIcon} alt="Coimbatore Icon" />,
    description: "Manchester of South India!",
  },
  {
    img: "assets/london.jpg",
    label: "London",
    icon: <img src={londonIcon} alt="London Icon" />,
    description: "The Big Smoke,!",
  },
  {
    img: "assets/aussie.jpg",
    label: "Australia",
    icon: <img src={aussieIcon} alt="Australia Icon" />,
    description: "The Last Frontier!",
  },
  {
    img: "assets/silicon.jpg",
    label: "Silicon Valley",
    icon: <img src={usaIcon} alt="Silicon Valley Icon" />,
    description: "Valley of Heart's Delight!",
  },
];

export const facilities = [
  {
    name: "Hospitals Nearby",
    icon: <FaHospital />,
  },
  {
    name: "Airport Nearby",
    icon: <MdLocalAirport />,
  },
  {
    name: "College Nearby",
    icon: <FaUniversity />,
  },
  {
    name: "Metro",
    icon: <FaTrain />,
  },
  {
    name: "Air Conditioning",
    icon: <BsSnow />,
  },
  {
    name: "Security cameras",
    icon: <GiCctvCamera />,
  },

  {
    name: "Free parking",
    icon: <AiFillCar />,
  },
  {
    name: " Pet allowed",
    icon: <MdPets />
  }
];
