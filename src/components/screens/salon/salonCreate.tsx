'use client';

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ISalonProfileRequest } from "@/types/salons/salonCrUD.interface";
import { createSalonProfileService } from "@/services/salons/salonCrUDService";
import { toast } from "react-hot-toast";
import { SalonProfileError } from "@/types/salons/salonCrUD.interface";

const CreateSalonProfilePage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ISalonProfileRequest>({
    mode: 'onBlur'
  });

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

  const onSubmit: SubmitHandler<ISalonProfileRequest> = async (data) => {
    const loadingToast = toast.loading('Создание профиля...');
    
    try {
      setIsSubmitting(true);
      
      // Очистка пустых строк
      const cleanData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key, 
          typeof value === 'string' ? value.trim() : value
        ])
      ) as ISalonProfileRequest;
  
      console.log('Очищенные данные формы:', cleanData);
  
      await createSalonProfileService(cleanData);
      
      toast.dismiss(loadingToast);
      toast.success('Профиль успешно создан!');
      reset();
      setImagePreview(null);
    } catch (error) {
      toast.dismiss(loadingToast);
      
      if (error instanceof SalonProfileError) {
        if (error.validationErrors?.detail) {
          error.validationErrors.detail.forEach(err => {
            toast.error(`Ошибка: ${err.msg}`);
          });
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error('Произошла неизвестная ошибка');
        console.error('Неожиданная ошибка:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const labelClassName = "block text-sm font-medium text-gray-700 mb-1";
  const errorClassName = "text-red-500 text-sm mt-1";

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Создать профиль салона</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className={labelClassName}>Название салона</label>
          <input
            {...register("name", {
              required: "Название салона обязательно",
              maxLength: {
                value: 255,
                message: "Название не может быть длиннее 255 символов"
              }
            })}
            id="name"
            type="text"
            placeholder="Введите название салона"
            className={inputClassName}
          />
          {errors.name && <p className={errorClassName}>{errors.name.message}</p>}
        </div>

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
          <label htmlFor="description" className={labelClassName}>Краткое описание</label>
          <textarea
            {...register("description")}
            id="description"
            rows={3}
            placeholder="Краткое описание салона"
            className={`${inputClassName} resize-none`}
          />
        </div>

        <div>
          <label htmlFor="text" className={labelClassName}>Подробное описание</label>
          <textarea
            {...register("text")}
            id="text"
            rows={6}
            placeholder="Подробное описание услуг и салона"
            className={`${inputClassName} resize-none`}
          />
        </div>

        <div>
          <label htmlFor="address" className={labelClassName}>Адрес</label>
          <input
            {...register("address", {
              required: "Адрес обязателен",
              maxLength: {
                value: 256,
                message: "Адрес не может быть длиннее 256 символов"
              }
            })}
            id="address"
            type="text"
            placeholder="Введите адрес салона"
            className={inputClassName}
          />
          {errors.address && <p className={errorClassName}>{errors.address.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className={labelClassName}>Телефон</label>
            <input
              {...register("phone", {
                required: "Телефон обязателен",
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
            <label htmlFor="website" className={labelClassName}>Веб-сайт</label>
            <input
              {...register("website", {
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Введите корректную ссылку"
                }
              })}
              id="website"
              type="url"
              placeholder="https://example.com"
              className={inputClassName}
            />
            {errors.website && <p className={errorClassName}>{errors.website.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div>
            <label htmlFor="whatsapp" className={labelClassName}>WhatsApp</label>
            <input
              {...register("whatsapp", {
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Введите корректную ссылку"
                }
              })}
              id="whatsapp"
              type="url"
              placeholder="https://wa.me/..."
              className={inputClassName}
            />
            {errors.whatsapp && <p className={errorClassName}>{errors.whatsapp.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="vk" className={labelClassName}>ВКонтакте</label>
            <input
              {...register("vk", {
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Введите корректную ссылку"
                }
              })}
              id="vk"
              type="url"
              placeholder="https://vk.com/..."
              className={inputClassName}
            />
            {errors.vk && <p className={errorClassName}>{errors.vk.message}</p>}
          </div>

          <div>
            <label htmlFor="instagram" className={labelClassName}>Instagram</label>
            <input
              {...register("instagram", {
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Введите корректную ссылку"
                }
              })}
              id="instagram"
              type="url"
              placeholder="https://instagram.com/..."
              className={inputClassName}
            />
            {errors.instagram && <p className={errorClassName}>{errors.instagram.message}</p>}
          </div>
        </div>

        <div>
  <label htmlFor="image" className={labelClassName}>Фото салона</label>
  <input
    {...register("image", { 
      validate: {
        fileSize: (value?: File | FileList) => {
          if (!value) return true;
          if (value instanceof FileList && value.length > 0) {
            const size = value[0].size / 1024 / 1024; // размер в МБ
            return size <= 5 || "Размер файла не должен превышать 5МБ";
          }
          if (value instanceof File) {
            const size = value.size / 1024 / 1024;
            return size <= 5 || "Размер файла не должен превышать 5МБ";
          }
          return true;
        },
        fileType: (value?: File | FileList) => {
          if (!value) return true;
          if (value instanceof FileList && value.length > 0) {
            return [
              'image/jpeg',
              'image/png',
              'image/webp'
            ].includes(value[0].type) || "Поддерживаются форматы: JPEG, PNG, WEBP";
          }
          if (value instanceof File) {
            return [
              'image/jpeg',
              'image/png',
              'image/webp'
            ].includes(value.type) || "Поддерживаются форматы: JPEG, PNG, WEBP";
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

export default CreateSalonProfilePage;