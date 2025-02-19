'use client';

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IMasterProfileRequest } from "@/types/masters/masterCrUD.interface";
import { Toaster } from "react-hot-toast";
import { createMasterProfileService } from "@/services/masters/masterCrUDService";  

const CreateMasterProfilePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IMasterProfileRequest>({
    defaultValues: {
      accepts_at_home: false,
      accepts_in_salon: false,
      accepts_offsite: false,
    }
  });

  const onSubmit: SubmitHandler<IMasterProfileRequest> = async (data) => {
    try {
      const response = await createMasterProfileService(data);
      if (response) {
        alert('Профиль успешно создан!');
        reset(); // очищаем форму
      } else {
        alert('Произошла ошибка при создании профиля');
      }
    } catch (error) {
      console.error("Ошибка при создании профиля мастера:", error);
      alert('Произошла ошибка при отправке данных');
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div>
        <h2>Создать профиль мастера</h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div>
            <label htmlFor="title">Заголовок</label>
            <input
              {...register("title", {
                required: "Заголовок обязателен",
                maxLength: {
                  value: 255,
                  message: "Заголовок не может быть длиннее 255 символов"
                }
              })}
              id="title"
              type="text"
              placeholder="Заголовок"
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="description">Описание</label>
            <textarea
              {...register("description")}
              id="description"
              placeholder="Описание"
            />
            {errors.description && <p>{errors.description.message}</p>}
          </div>

          <div>
            <label htmlFor="specialty">Специальность</label>
            <input
              {...register("specialty", {
                required: "Специальность обязательна",
                maxLength: {
                  value: 255,
                  message: "Специальность не может быть длиннее 255 символов"
                }
              })}
              id="specialty"
              type="text"
              placeholder="Введите специальность"
            />
            {errors.specialty && <p>{errors.specialty.message}</p>}
          </div>

          <div>
            <label htmlFor="address">Адрес</label>
            <input
              {...register("address", {
                maxLength: 256
              })}
              id="address"
              type="text"
              placeholder="Введите адрес"
            />
            {errors.address && <p>{errors.address.message}</p>}
          </div>

          <div>
            <label htmlFor="phone">Телефон</label>
            <input
              {...register("phone", {
                maxLength: 20
              })}
              id="phone"
              type="text"
              placeholder="Введите телефон"
            />
            {errors.phone && <p>{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="telegram">Телеграм</label>
            <input
              {...register("telegram", {
                maxLength: 2083
              })}
              id="telegram"
              type="url"
              placeholder="Введите ссылку на Telegram"
            />
            {errors.telegram && <p>{errors.telegram.message}</p>}
          </div>

          <div>
            <label htmlFor="accepts_at_home">Принимает на дому</label>
            <input
              {...register("accepts_at_home")}
              id="accepts_at_home"
              type="checkbox"
            />
          </div>

          <div>
            <label htmlFor="accepts_in_salon">Принимает в салоне</label>
            <input
              {...register("accepts_in_salon")}
              id="accepts_in_salon"
              type="checkbox"
            />
          </div>

          <div>
            <label htmlFor="accepts_offsite">Выезд на место</label>
            <input
              {...register("accepts_offsite")}
              id="accepts_offsite"
              type="checkbox"
            />
          </div>

          <div>
            <label htmlFor="image">Фото профиля</label>
            <input
              {...register("image", { required: "Фото профиля обязательно" })}
              id="image"
              type="file"
              accept="image/*"
            />
            {errors.image && <p>{errors.image.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Создание..." : "Создать профиль"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateMasterProfilePage;
