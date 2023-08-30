export default function HeroText({ title, text }) {
  return (
    <div className="text-center my-14">
      <h1 className="text-5xl mb-8 font-bold">{title}</h1>
      {text && <p className="text-base text-gray-500">{text}</p>}
    </div>
  )
}
