import './JournalItem.css';

const JournalItem = ({ title, text, date }) => {

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('ru-RU', options);

  return (
    <>
      <h2 className="journal-item__header">{title}</h2>
      <h2 className="journal-item__body">
        <div className="journal-item__date">{formattedDate}</div>
        <div className="journal-item__text">{text}</div>
      </h2>
    </>
  );
};

export default JournalItem;
