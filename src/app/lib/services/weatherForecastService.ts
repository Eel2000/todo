import {WeatherForecast} from "@/app/lib/models/weatherForecast";

export async function GetWeather(): Promise<WeatherForecast[]> {
    const response = await fetch("https://localhost:7108/WeatherForecast");
    if (!response.ok) {
        console.log(response.status)
        return [];
    } else {
        // console.log(`data fetched => ${JSON.stringify(json)} `)
        return await response.json()
    }
}