from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from .database import engine
from . import models, schemas, crud, auth, dependencies
from datetime import timedelta
from .config import ACCESS_TOKEN_EXPIRE_MINUTES


models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="H-Trace Auth Service", version="1.0.0")


@app.post("/auth/register", response_model=schemas.UserOut)
def register(
    user: schemas.UserCreate,
    db=Depends(dependencies.get_db)
):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    return crud.create_user(db=db, user=user)


@app.post("/auth/login", response_model=schemas.Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db=Depends(dependencies.get_db)
):
    user = db.query(models.User).filter(
        models.User.email == form_data.username
    ).first()
    if not user or not auth.verify_password(
        form_data.password,
        user.hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    access_token_expires = timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )
    access_token = auth.create_access_token(
        data={
            "sub": user.email,
            "role": user.role.value,
            "plan": user.plan.value
        },
        expires_delta=access_token_expires,
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/users/me", response_model=schemas.UserOut)
def read_users_me(
    current_user: models.User = Depends(
        dependencies.get_current_active_user
    )
):
    return current_user


# ----- Admin endpoints -----
@app.get("/admin/users", response_model=list[schemas.UserOut])
def list_all_users(
    current_user: models.User = Depends(
        dependencies.RoleChecker(["admin"])
    ),
    db=Depends(dependencies.get_db)
):
    return db.query(models.User).all()


@app.put("/admin/users/{user_id}/plan")
def update_user_plan(
    user_id: int,
    plan: schemas.PlanUpdate,
    current_user: models.User = Depends(
        dependencies.RoleChecker(["admin"])
    ),
    db=Depends(dependencies.get_db)
):
    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.plan = plan.plan
    db.commit()
    return {"message": "Plan updated"}


@app.put("/admin/users/{user_id}/role")
def update_user_role(
    user_id: int,
    role: schemas.RoleUpdate,
    current_user: models.User = Depends(
        dependencies.RoleChecker(["admin"])
    ),
    db=Depends(dependencies.get_db)
):
    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.role = role.role
    db.commit()
    return {"message": "Role updated"}
