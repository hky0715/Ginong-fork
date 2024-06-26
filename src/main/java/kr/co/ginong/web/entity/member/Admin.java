package kr.co.ginong.web.entity.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Admin {
    private long    id;
    private String  name;
    private String  pwd;
}
