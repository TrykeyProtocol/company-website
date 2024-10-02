"use client";
import React, { useState, useEffect, useCallback } from "react";
import { MapPin, Users, Route, Phone, DollarSign, Power } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { axiosAuth } from "@/library/api/axios";
import { AxiosResponse } from "axios";

export interface Vehicle {
  id: number;
  number: string;
  image: string;
  driver: string;
  phoneNumber: string;
  passengers: number;
  location: string;
  distanceTravelled: number;
  expectedYield: number;
  totalRevenue: number;
  isOn: boolean;
}

interface ToggleResponse {
  message: string;
}

const Dashboard = () => {
  const vehicles: Vehicle[] = [
    {
      id: 1,
      number: "V001",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      driver: "John Doe",
      phoneNumber: "+234 800 123 4567",
      passengers: 3,
      location: "Lagos Central",
      distanceTravelled: 150,
      expectedYield: 15000,
      totalRevenue: 75000,
      isOn: true,
    },
    {
      id: 2,
      number: "V002",
      image:
        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      driver: "Jane Smith",
      phoneNumber: "+234 800 987 6543",
      passengers: 2,
      location: "Abuja North",
      distanceTravelled: 80,
      expectedYield: 8000,
      totalRevenue: 45000,
      isOn: true,
    },
    {
      id: 3,
      number: "V003",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      driver: "Mike Johnson",
      phoneNumber: "+234 800 456 7890",
      passengers: 4,
      location: "Port Harcourt South",
      distanceTravelled: 200,
      expectedYield: 20000,
      totalRevenue: 15000,
      isOn: true,
    },
    {
      id: 4,
      number: "V003",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      driver: "Mike Johnson",
      phoneNumber: "+234 800 456 7890",
      passengers: 4,
      location: "Port Harcourt South",
      distanceTravelled: 200,
      expectedYield: 20000,
      totalRevenue: 100000,
      isOn: true,
    },
    {
      id: 5,
      number: "V003",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      driver: "Mike Johnson",
      phoneNumber: "+234 800 456 7890",
      passengers: 4,
      location: "Port Harcourt South",
      distanceTravelled: 200,
      expectedYield: 20000,
      totalRevenue: 75000,
      isOn: true,
    },
  ];
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [vehiclesState, setVehiclesState] = useState(vehicles);

  const handleTurnOff = (id: number) => {
    setVehiclesState((prevState) =>
      prevState.map((vehicle) =>
        vehicle.id === id ? { ...vehicle, isOn: false } : vehicle
      )
    );
  };

  const queryClient = useQueryClient();

  const toggleVehicleMutation = useMutation({
    mutationFn: (vehicle: Vehicle) =>
      axiosAuth.post(`/assets/AMS1120/control/999/`, {
        data: vehicle.isOn ? "turn_off" : "turn_on",
        action_type: "ignition",
      }),
    onSuccess: (data, vehicle) => {
      alert("Success: Vehicle state toggled");
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
    onError: (error) => {
      alert("Error: Failed to toggle vehicle state");
      console.error("Failed to toggle vehicle state:", error);
    },
  });

  const handleToggleVehicle = (vehicle: Vehicle) => {
    toggleVehicleMutation.mutate(vehicle);
  };

  return (
    <div className="p-8 ">
      <h1 className="text-4xl font-bold mb-4">Fleet Dashboard</h1>
      <div className=" md:flex gap-8 items-start">
        <div className=" lg:w-2/3">
          {/* Revenue Chart */}
          <div className="mb-12 rounded-3xl shadow-2xl shadow-[#4c67641f] p-6 h-80 bg-lightMode-background-main dark:bg-darkMode-background-main">
            <h2 className="text-2xl font-bold mb-4">Total Revenue Overview</h2>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={vehiclesState}>
                <XAxis dataKey="number" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalRevenue" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehiclesState.map((vehicle) => (
              <div
                key={vehicle.id}
                className={` rounded-2xl shadow-2xl shadow-[#4c67641f] overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 bg-lightMode-background-main dark:bg-darkMode-background-main ${
                  selectedVehicle?.id === vehicle.id
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
                onClick={() => setSelectedVehicle(vehicle)}
              >
                {/* <img
                  src={vehicle.image}
                  alt={vehicle.number}
                  className="w-full h-48 object-cover"
                /> */}
                      <Image
        src={vehicle.image}
        alt={vehicle.number}
        width={40}
        height={48}
        className="w-full h-48 object-cover"
      />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{vehicle.number}</h2>
                  <p className=" text-lightMode-text-main dark:text-darkMode-text-main text-sm">
                    {vehicle.driver}
                  </p>
                  <p
                    className={`mt-2 inline-block px-2 py-1 rounded-full text-sm ${
                      vehicle.isOn
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {vehicle.isOn ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedVehicle ? (
          <div className=" rounded-3xl shadow-2xl shadow-[#4c67641f] p-8 bg-lightMode-background-main dark:bg-darkMode-background-main lg:w-1/3 border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold ">
                {selectedVehicle.number} Details
              </h2>

              <button
                // onClick={() => handleTurnOff(selectedVehicle.id)}
                onClick={() => handleToggleVehicle(selectedVehicle)}
                className={`flex items-center gap-2`}
                disabled={!selectedVehicle.isOn}
              >
                <div
                  className={`p-2.5 rounded-xl ${
                    selectedVehicle.isOn
                      ? "bg-red-500/20 hover:bg-red-600/20"
                      : "bg-green-500/20 hover:bg-green-600/20 "
                  }`}
                >
                  {toggleVehicleMutation.isPending ? (
                    <svg
                      className="animate-spin -ml-1  h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      <Power width={20} height={20} className={` ${
                    selectedVehicle.isOn
                      ? "text-red-400"
                      : "text-green-500 "
                  }`} />
                    </>
                  )}
                </div>

                <p
                  className={` font-semibold text-sm ${
                    selectedVehicle.isOn
                      ? "text-red-400"
                      : "text-green-500 "
                  }`}
                >
                  {selectedVehicle.isOn ? "Turn Off" : "Turn On"} 
                </p>
              </button>
            </div>

            <div className="my-8 p-6 border border-gray-200 dark:border-gray-800 rounded-xl">
              <div>
                <p>Expected Yield</p>
                <p className="text-3xl font-bold text-blue-600">
                  ₦{selectedVehicle.expectedYield.toLocaleString()}
                </p>
              </div>
              <div className="text-right text-sm">
                <p>Based on</p>
                <p className=" font-semibold">
                  {selectedVehicle.distanceTravelled} km travelled
                </p>
                <p className=" font-semibold">
                  {selectedVehicle.passengers} passengers
                </p>
              </div>
            </div>

            <div className=" flex flex-col gap-3">
              <div className="flex items-center mb-3">
                <Users className="max-w-6 w-full h-6 text-blue-500 mr-2" />
                <span className=" align-middle inline-block">
                  <span className=" text-sm">Passengers:</span>{" "}
                  <span className=" font-semibold">
                    {selectedVehicle.passengers}
                  </span>
                </span>
              </div>

              <div className="flex items-center mb-3">
                <MapPin className=" max-w-6 w-full h-6 text-green-500 mr-2" />
                <span className=" align-middle inline-block">
                  <span className="text-sm">Current Location:</span>{" "}
                  <span className="font-semibold">
                    {selectedVehicle.location}
                  </span>
                </span>
              </div>

              <div className="flex items-center mb-3">
                <Route className="max-w-6 w-full h-6 text-purple-500 mr-2" />
                <span className=" align-middle inline-block">
                  <span className=" text-sm">Distance Travelled:</span>{" "}
                  <span className=" font-semibold">
                    {selectedVehicle.distanceTravelled} km
                  </span>
                </span>
              </div>
              <div className="flex items-center mb-3">
                <Users className="max-w-6 w-full h-6 text-orange-500 mr-2" />
                <span className=" align-middle inline-block">
                  <span className=" text-sm">Driver:</span>{" "}
                  <span className=" font-semibold">
                    {selectedVehicle.driver}
                  </span>
                </span>
              </div>
              <div className="flex items-center mb-3">
                <Phone className="max-w-6 w-full h-6 text-red-500 mr-2" />
                <span className=" align-middle inline-block">
                  <span className=" text-sm">Phone Number:</span>{" "}
                  <span className=" font-semibold">
                    {selectedVehicle.phoneNumber}
                  </span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className=" rounded-3xl bg-lightMode-background-main dark:bg-darkMode-background-main shadow-2xl shadow-[#4c67641f] p-8 pb-40 lg:w-1/3  border border-gray-200 dark:border-gray-800">
            <p className="">Select a vehicle to see details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
