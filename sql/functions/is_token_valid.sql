CREATE OR REPLACE FUNCTION is_token_valid(user_token VARCHAR)
RETURNS BOOLEAN AS $$
  BEGIN
    RETURN EXISTS (SELECT * FROM Token 
      WHERE userToken = user_token AND NOW() - createdAt < INTERVAL '1 day');
  END;
$$ language plpgsql;
-- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjI1ZGJlN2ItYzk3Yy00MTExLThkODktZTA3YzliZGIwZjRlIiwibmlja05hbWUiOiIiLCJpYXQiOjE1OTM3NjE4Mjh9.RsWVI_8QoORl23855OOw5bmjh_WjrQxRixrueEmfKoU
-- SELECT * FROM Token WHERE userToken = user_token AND NOW() - createdAt < INTERVAL '1 day'