const useGetCategoryNames = (categories) => {
  return (categoryIds) => {
    return categoryIds
      .map((id) => categories.find((category) => category.id === id))
      .filter(Boolean)
      .map((category) => category.name)
  }
}

export default useGetCategoryNames
