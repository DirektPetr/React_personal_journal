import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import cn from 'classnames';

const INITIAL_STATE = {
  title: true,
  date: true,
  post: true,
};

const JournalForm = ({ onSubmit }) => {
  const [formValidState, setFormValidState] = useState(INITIAL_STATE);

  useEffect(() => {
    let timerId;
    if (!formValidState.date || !formValidState.post || !formValidState.title) {
      setTimeout(() => {
        setFormValidState(INITIAL_STATE);
      }, 2000);
    }
    return () => {
      clearTimeout(timerId)
    }
  }, [formValidState]);

  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let isFormValid = true;

    if (!formProps.title?.trim().length) {
      setFormValidState((state) => ({ ...state, title: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, title: true }));
    }
    if (!formProps.date.trim().length) {
      setFormValidState((state) => ({ ...state, date: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, date: true }));
    }
    if (!formProps.post?.trim().length) {
      setFormValidState((state) => ({ ...state, post: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, post: true }));
    }
    if (!isFormValid) {
      return;
    }
    onSubmit(formProps);
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div>
        <input
          type="text"
          name="title"
          className={cn(styles['input-title'], {
            [styles['invalid']]: !formValidState.title,
          })}
        />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-label']}>
          <img src="/calendar.svg" alt="Иконка календаря" />
          <span>Дата</span>
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className={cn(styles['input'], {
            [styles['invalid']]: !formValidState.date,
          })}
        />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <img src="/folder.svg" alt="Иконка папки" />
          <span>Метки</span>
        </label>
        <input
          type="text"
          id="tag"
          name="tag"
          className={cn(styles['input'])}
        />
      </div>
      <textarea
        name="post"
        id=""
        cols="30"
        rows="10"
        className={cn(styles['input'], {
          [styles['invalid']]: !formValidState.post,
        })}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
};

export default JournalForm;
