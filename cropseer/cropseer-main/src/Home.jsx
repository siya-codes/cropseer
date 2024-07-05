import React, { useState } from "react";
import { ReactComponent as Temp } from "../src/Icons/temp.svg";
import { ReactComponent as Humidity } from "../src/Icons/humidity.svg";
import { ReactComponent as Rain } from "../src/Icons/rain.svg";
import { ReactComponent as Ph } from "../src/Icons/ph.svg";
import { ReactComponent as Nit } from "../src/Icons/nit.svg";
import { ReactComponent as Phos } from "../src/Icons/pho.svg";
import { ReactComponent as Potash } from "../src/Icons/potash.svg";
import { IoMdArrowRoundBack } from "react-icons/io";

const Home = () => {
  const [show, setShow] = useState(false);
  const [predictedCrop, setPredictedCrop] = useState("");
  const cropsimages = {
    apple: "/apple.jpg",
    banana: "/banana.jpg",
    blackgram: "/blackgram.jpeg",
    chickpea: "/Chickpeas.png",
    coconut: "/Coconut.jpg",
    coffee: "/coffee.jpg",
    cotton: "/cotton.jpg",
    grapes: "/grapes.png",
    jute: "/jute.jpg",
    kidneybeans: "/kidneybeans.jpg",
    lentil: "/lentil.png",
    maize: "/maize.jpg",
    mango: "/Mangoes.png",
    mothbeans: "/moth-bean.jpg",
    mungbean: "/mung.jpg",
    muskmelon: "/muskmelon.jpg",
    orange: "/oranges.jpg",
    papaya: "/papaya.jpg",
    pigeonpeas: "/pigeonoeas.png",
    pomegranate: "/pomegranate.jpg",
    rice: "/rice.jpg",
    watermelon: "/watermelon.jpg",
  };
  const initialData = {
    N: 0.0,
    P: 0.0,
    K: 0.0,
    temperature: 0.0,
    humidity: 0.0,
    ph: 0.0,
    rainfall: 0.0,
  };
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.predicted_crop) {
        setPredictedCrop(data.predicted_crop);
        setShow(true);
      } else {
        alert("Error predicting crop");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error predicting crop");
    }
  };

  return (
    <div className="h-screen w-full bg flex justify-end items-center">
      {!show ? (
        <div className="h-[90vh] w-[35vw] bgform mr-[10%] bg-[#dce0e0] p-6 rounded-md xl:h-[75vh] xl:w-[27vw] xl:mr-[15%]">
          <div className="text-3xl font-play text-[#278986] font-semibold text-center">
            Crop Predictor
          </div>
          <form
            className="flex flex-col gap-[2vw] mt-3"
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <Temp className="absolute top-[2px]" />
              <input
                type="number"
                step="0.1"
                name="temperature"
                id="temperature"
                placeholder="Temperature"
                className="w-full border-b-2 border-[#197B7A] py-1 pl-10 focus:outline-none bg-transparent"
                onChange={handleInputChange}
              />
            </div>
            <div className="relative">
              <Humidity className="absolute top-[2px]" />
              <input
                type="number"
                step="0.1"
                name="humidity"
                id="humidity"
                placeholder="Humidity"
                className="w-full border-b-2 border-[#197B7A] py-1 pl-10 focus:outline-none bg-transparent"
                onChange={handleInputChange}
              />
            </div>
            <div className="relative">
              <Rain className="absolute top-[2px]" />
              <input
                type="number"
                step="0.1"
                name="rainfall"
                id="rainfall"
                placeholder="Rain Fall (mm)"
                className="w-full border-b-2 border-[#197B7A] py-1 pl-10 focus:outline-none bg-transparent"
                onChange={handleInputChange}
              />
            </div>
            <div className="relative">
              <Ph className="absolute top-[2px]" />
              <input
                type="number"
                step="0.1"
                name="ph"
                id="ph"
                placeholder="pH of soil"
                className="w-full border-b-2 border-[#197B7A] py-1 pl-10 focus:outline-none bg-transparent"
                onChange={handleInputChange}
              />
            </div>
            <div className="relative">
              <Nit className="absolute top-[2px]" />
              <input
                type="number"
                step="0.1"
                name="N"
                id="nitrogen"
                placeholder="Nitrogen Ratio"
                className="w-full border-b-2 border-[#197B7A] py-1 pl-10 focus:outline-none bg-transparent"
                onChange={handleInputChange}
              />
            </div>
            <div className="relative">
              <Phos className="absolute top-[2px]" />
              <input
                type="number"
                step="0.1"
                name="P"
                id="phosphorous"
                placeholder="Phosphorous Ratio"
                className="w-full border-b-2 border-[#197B7A] py-1 pl-10 focus:outline-none bg-transparent"
                onChange={handleInputChange}
              />
            </div>
            <div className="relative">
              <Potash className="absolute top-[2px]" />
              <input
                type="number"
                step="0.1"
                name="K"
                id="potassium"
                placeholder="Potassium Ratio"
                className="w-full border-b-2 border-[#197B7A] py-1 pl-10 focus:outline-none bg-transparent"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-center mt-5 xl:mt-10">
              <button
                type="submit"
                className="bg-[#278986] py-2 w-[70%] rounded-full text-white font-pop xl:py-3"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="h-[90vh] w-[35vw] mr-40 bg-[#dce0e0] p-6 rounded-md flex flex-col items-center gap-8 relative xl:h-[75vh] xl:w-[27vw] xl:mr-[15%] xl:gap-[2vw]">
          <IoMdArrowRoundBack
            onClick={() => setShow(false)}
            className="justify-self-start absolute top-2 left-2 h-8 w-8 cursor-pointer"
          />
          <div className="text-2xl font-play font-semibold ">
            Best Crops As Per Given Data
          </div>
          <img
            src={cropsimages[predictedCrop]}
            alt=""
            className="h-[50%] w-[80%] xl:h-[60%] xl:w-[90%]"
          />
          <div className="text-4xl font-play font-semibold">
            {predictedCrop}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
