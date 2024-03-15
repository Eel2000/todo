'use client'

import {useEffect, useState} from "react";
import {WeatherForecast} from "@/app/lib/models/weatherForecast";
import {GetWeather} from "@/app/lib/services/weatherForecastService";

export default function page() {

    const [forecast, setForecast] = useState<WeatherForecast[]>([])
    const getData = async () => {
        try {
            await GetWeather().then(
                res => setForecast([...res])
            )
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData().then(res => "data got")
    }, []);

    return (
        <div className="grid-cols-1 m-4">
            <h1 className="text-blue-500 text-2xl text-center">Welcome to the weather forecast</h1>
            <div className="h-full">
                <button onClick={() => getData()}
                        className="bg-blue-800 rounded w-[95px] h-[50px] mx-0 text-white hover:bg-blue-900 active:border-2 border-blue-950">
                    refresh
                </button>
            </div>
            <div className="relative overflow-x-auto my-4">
                <table className="table-auto w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Temp in °C</th>
                        <th scope="col" className="px-6 py-3">Temp in °F</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Summary</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        forecast.map(f =>
                            <tr key={f.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">{f.temperatureC}</td>
                                <td className="px-6 py-4">{f.temperatureF}</td>
                                <td className="px-6 py-4">{f.date}</td>
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{f.summary}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}