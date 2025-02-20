'use client';

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IMasterProfileRequest } from "@/types/masters/masterCrUD.interface";
import { createMasterProfileService } from "@/services/masters/masterCrUDService";
import { toast } from "react-hot-toast";
import { MasterProfileError } from "@/types/masters/masterCrUD.interface";

const CreateMasterProfilePage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<IMasterProfileRequest>({
    defaultValues: {
      accepts_at_home: false,
      accepts_in_salon: false,
      accepts_offsite: false,
    }
  });

  // Наблюдаем за изменениями поля image для предпросмотра
  const watchedImage = watch("image");
  
  React.useEffect(() => {
    if (watchedImage instanceof FileList && watchedImage.length > 0) {
      const file = watchedImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [watchedImage]);

  const onSubmit: SubmitHandler<IMasterProfileRequest> = async (data) => {
    const loadingToast = toast.loading('Создание профиля...');
    
    try {
      const formData = { ...data };
      // Правильная обработка поля image
      if (formData.image instanceof FileList && formData.image.length > 0) {
        formData.image = formData.image[0];
      }

      const response = await createMasterProfileService(formData);
      
      toast.dismiss(loadingToast);
      toast.success('Профиль успешно создан!');
      reset();
      setImagePreview(null);
      
    } catch (error) {
      toast.dismiss(loadingToast);
      
      if (error instanceof MasterProfileError) {
        if (error.validationErrors) {
          const firstError = error.validationErrors.detail[0];
          toast.error(`Ошибка валидации: ${firstError.msg}`);
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error('Произошла неизвестная ошибка');
      }
      
      console.error("Ошибка при создании профиля:", error);
    }
  };

  const inputClassName = "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const labelClassName = "block text-sm font-medium text-gray-700 mb-1";
  const errorClassName = "text-red-500 text-sm mt-1";
  const checkboxWrapperClassName = "flex items-center gap-2 mb-4";

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Создать профиль мастера</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className={labelClassName}>Заголовок</label>
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
            placeholder="Введите заголовок профиля"
            className={inputClassName}
          />
          {errors.title && <p className={errorClassName}>{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className={labelClassName}>Описание</label>
          <textarea
            {...register("description")}
            id="description"
            rows={4}
            placeholder="Расскажите о себе и своих услугах"
            className={`${inputClassName} resize-none`}
          />
        </div>

        <div>
          <label htmlFor="specialty" className={labelClassName}>Специальность</label>
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
            placeholder="Например: Парикмахер-стилист"
            className={inputClassName}
          />
          {errors.specialty && <p className={errorClassName}>{errors.specialty.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className={labelClassName}>Телефон</label>
            <input
              {...register("phone", {
                maxLength: 20,
                pattern: {
                  value: /^[+]?[0-9]{10,15}$/,
                  message: "Введите корректный номер телефона"
                }
              })}
              id="phone"
              type="tel"
              placeholder="+7XXXXXXXXXX"
              className={inputClassName}
            />
            {errors.phone && <p className={errorClassName}>{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="telegram" className={labelClassName}>Телеграм</label>
            <input
              {...register("telegram", {
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Введите корректную ссылку"
                }
              })}
              id="telegram"
              type="url"
              placeholder="https://t.me/username"
              className={inputClassName}
            />
            {errors.telegram && <p className={errorClassName}>{errors.telegram.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="address" className={labelClassName}>Адрес</label>
          <input
            {...register("address", {
              maxLength: 256
            })}
            id="address"
            type="text"
            placeholder="Введите адрес работы"
            className={inputClassName}
          />
        </div>

        <div className="space-y-3">
          <h3 className="font-medium">Формат работы</h3>
          
          <div className={checkboxWrapperClassName}>
            <input
              {...register("accepts_at_home")}
              id="accepts_at_home"
              type="checkbox"
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="accepts_at_home">Принимаю на дому</label>
          </div>

          <div className={checkboxWrapperClassName}>
            <input
              {...register("accepts_in_salon")}
              id="accepts_in_salon"
              type="checkbox"
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="accepts_in_salon">Принимаю в салоне</label>
          </div>

          <div className={checkboxWrapperClassName}>
            <input
              {...register("accepts_offsite")}
              id="accepts_offsite"
              type="checkbox"
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="accepts_offsite">Выезжаю к клиенту</label>
          </div>
        </div>

        <div>
          <label htmlFor="image" className={labelClassName}>Фото профиля</label>
          <input
            {...register("image", { 
              required: "Фото профиля обязательно",
              validate: {
                fileSize: (value: FileList | string | File) => {
                  if (value instanceof FileList && value.length > 0) {
                    const size = value[0].size / 1024 / 1024; // размер в МБ
                    return size <= 5 || "Размер файла не должен превышать 5МБ";
                  }
                  return true;
                },
                fileType: (value: FileList | string | File) => {
                  if (value instanceof FileList && value.length > 0) {
                    return [
                      'image/jpeg',
                      'image/png',
                      'image/webp'
                    ].includes(value[0].type) || "Поддерживаются форматы: JPEG, PNG, WEBP";
                  }
                  return true;
                }
              }
            })}
            id="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
          />
          <div className="mt-2">
            <label
              htmlFor="image"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Выбрать фото
            </label>
          </div>
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Предпросмотр"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
          {errors.image && <p className={errorClassName}>{errors.image.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Создание..." : "Создать профиль"}
        </button>
      </form>
    </div>
  );
};

export default CreateMasterProfilePage;