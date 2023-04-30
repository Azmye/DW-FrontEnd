import { useState } from 'react';
import { QueryCache, useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { API } from '../../Config/Api';
import { AlertError, AlertSuccess } from '../Modal/AlertCollection';

const UpdateMovie = ({ movieDets }) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    title: movieDets.title,
    year: movieDets.year,
    thumbnail: '',
    category_id: '',
    description: movieDets.description,
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });
  };

  let { data: categories } = useQuery('categoriesCache', async () => {
    const response = await API.get('/categories');
    return response.data.data;
  });

  const handleOnSubmit = useMutation(
    async (e) => {
      try {
        e.preventDefault();

        const config = {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        };

        const formData = new FormData();
        formData.set('image', form.thumbnail[0], form.thumbnail[0].name);
        formData.set('title', form.title);
        formData.set('year', form.year);
        formData.set('desc', form.description);
        formData.set('category_id', form.category_id);

        await API.patch(`/film/${movieDets.id}`, formData, config);
        setMessage(<AlertSuccess message="Success to update film" />);
        navigate(`/admin-dashboard`);
      } catch (err) {
        e.preventDefault();
        setMessage(<AlertError message="Failed to update film" />);
      }
    },
    {
      onSuccess: () => {
        QueryCache.invalidateQueries('moviesCache');
      },
      onError: () => {
        QueryCache.invalidateQueries('moviesCache');
      },
    }
  );

  return (
    <div className={`px-8 pt-3 pb-5 text-white`}>
      <div className="bg-zinc-900 p-3 rounded-md">
        {message && message}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-3xl font-bold mb-5">Update Movie</h2>
        </div>
        <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <div className="flex gap-x-5 w-full mb-3">
            <input onChange={handleOnChange} value={form.title} type="text" name="title" id="title" placeholder="Title" className="w-3/5 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-red-700 border-none" />
            <input onChange={handleOnChange} className="w-2/5 text-sm text-white border-none rounded-lg cursor-pointer bg-zinc-800 focus:outline-none file:bg-red-700" id="thumbnail" name="thumbnail" type="file" />
          </div>
          <div className="mb-3">
            <input onChange={handleOnChange} value={form.year} type="text" name="year" id="year" placeholder="Year" className="w-full rounded-md bg-zinc-800 text-white focus:ring-2 focus:ring-red-700 border-none" />
          </div>
          <div className="mb-3">
            <select onChange={handleOnChange} name="category_id" id="category_id" className="w-full rounded-md bg-zinc-800 text-gray-500 focus:text-white focus:ring-2 focus:ring-red-700 border-none">
              <option value="default" className="hidden">
                Categories
              </option>
              {categories?.map((index, id) => (
                <option key={id} value={index?.id}>
                  {index?.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <textarea
              onChange={handleOnChange}
              value={form.description}
              name="description"
              id="description"
              placeholder="Description"
              className="w-full rounded-md text-white bg-zinc-800 h-32 focus:ring-2 focus:ring-red-700 border-none"
            ></textarea>
          </div>
          <div className="text-right">
            <button className="bg-green-700 px-4 py-2 rounded-md hover:bg-green-900">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;
