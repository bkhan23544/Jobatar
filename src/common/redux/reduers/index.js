
import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { userReducer  } from './user.reducer';
import { alertReducer } from './alert.reducer';
import { processReducer } from './process.reducer';
import { uploadReducer } from './upload.reducer';
import { categoriesReducer } from './categories.reducer';
import { skillsReducer } from './skills.reducer';
import { questionsReducer } from './questions.reducer';
import { countriesReducer } from './countries.reducer';
import { serviceReducer } from './service.reducer';
import { jobReducer } from './job.reducer';
import { experiencesReducer } from './experiences.reducer';
import { educationsReducer } from './educations.reducer';
import { searchReducer } from './search.reducer';
import { favoriteReducer } from './favorite.reducer';
import { connectionReducer } from './connection.reducer';
import { proposalReducer } from './proposal.reducer';
import { messageReducer } from './message.reducer';
import { platformsReducer } from './platforms.reducer';
import { blogReducer } from './blog.reducer';
import { notificationReducer } from "./notification.reducer";

const rootReducer = combineReducers({
    authentication:authReducer,
    process:processReducer,
    user:userReducer,
    alert:alertReducer,
    upload:uploadReducer,
    categories:categoriesReducer,
    skills:skillsReducer,
    questions: questionsReducer,
    platforms: platformsReducer,
    countries: countriesReducer,
    services: serviceReducer,
    jobs: jobReducer,
    experiences:experiencesReducer,
    educations:educationsReducer,
    search:searchReducer,
    favorite:favoriteReducer,
    connection:connectionReducer,
    proposals:proposalReducer,
    message:messageReducer,
    blog:blogReducer,
    notifications:notificationReducer,
});

export default rootReducer;
